const { client } = require("./index");

async function dropTables() {
	try {
		console.log("Starting to drop tables...");

		// have to make sure to DROP IN CORRECT ORDER
		await client.query(`
		DROP TABLE IF EXISTS reviews;
		DROP TABLE IF EXISTS cart;
		DROP TABLE IF EXISTS orders;
		DROP TABLE IF EXISTS products;
		DROP TABLE IF EXISTS users;
	  `);

		console.log("Finished dropping tables!");
	} catch (error) {
		console.error("Error dropping tables!");
		throw error;
	}
}

async function createTables() {
	console.log("Starting to build tables...");
	// create all tables, in the correct order
	await client.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            username VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            admin BOOLEAN DEFAULT false
        );
        CREATE TABLE products (
            product_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            price DECIMAL(10,2),
            genre VARCHAR(255),
            quantity INT,
            image_url VARCHAR(255)
        );
        CREATE TABLE orders (
            order_id SERIAL PRIMARY KEY,
            user_id INT,
            product_id INT,
            quantity INT,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            shipping_address VARCHAR(255),
            billing_address VARCHAR(255),
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        );
        CREATE TABLE cart (
            cart_id SERIAL PRIMARY KEY,
            user_id INT,
            product_id INT,
            quantity INT,
            price DECIMAL(10,2),
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        );
        CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,                        
            user_id INT,
            product_id INT,                        
            title VARCHAR(255),                        
            description TEXT,                        
            rating INT,                        
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        );
  `);
}

async function seedTables() {
	console.log("Starting to seed tables...");
	try {
		await client.query("BEGIN");

		// async function createInitialUsers() {
		console.log("Starting to create users...");
		// Seed users table
		await client.query(`
        INSERT INTO users (name, email, username, password, admin)
        VALUES ('John Smith', 'john.smith@example.com', 'johnsmith', 'password123', true),
               ('Jane Doe', 'jane.doe@example.com', 'janedoe', 'password123', false)
      `);
		console.log("Finished creating users...");
		// }

		// Seed products table with movies
		// async function createInitialMovies() {
		console.log("Starting to create products...");
		await client.query(`
        INSERT INTO products (name, description, price, genre, quantity, image_url)
        VALUES ('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 9.99, 'Drama', 100, 'https://www.example.com/shawshank.jpg'),
               ('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 12.99, 'Crime', 50, 'https://www.example.com/godfather.jpg'),
               ('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 14.99, 'Action', 75, 'https://www.example.com/darkknight.jpg')
      `);
		console.log("Finished creating products...");
		// }

		// Seed orders table
		// async function createInitialOrders() {
		console.log("Starting to create orders...");
		await client.query(`
        INSERT INTO orders (user_id, product_id, quantity, shipping_address, billing_address)
        VALUES (1, 1, 2, '123 Main St', '456 Elm St'),
               (2, 3, 1, '789 Maple Ave', '1011 Oak St')
      `);
		console.log("Finished creating orders...");
		// }

		// Seed cart table
		// async function createInitialCart() {
		console.log("Starting to create carts...");
		await client.query(`
        INSERT INTO cart (user_id, product_id, quantity, price)
        VALUES (1, 2, 1, 12.99),
               (2, 1, 2, 19.98)
      `);
		console.log("Finished creating carts...");
		// }

		// Seed reviews table
		// async function createInitialReviews() {
		console.log("Starting to create reviews...");
		await client.query(`
        INSERT INTO reviews (user_id, product_id, title, description, rating)
        VALUES (1, 1, 'Amazing movie!', 'I loved this movie from start to finish. The acting was superb and the storyline kept me engaged throughout.', 5),
               (2, 3, 'One of the best superhero movies ever', 'This movie had everything - great action, amazing performances, and a compelling story. Highly recommended!', 4)
      `);
		console.log("Finished creating reviews...");
		// }

		await client.query("COMMIT");
		console.log("Tables seeded successfully!");
	} catch (error) {
		await client.query("ROLLBACK");
		console.error("Error seeding tables:", error);
	} finally {
		client.end();
	}
}

async function rebuildDB() {
	try {
		client.connect();

		await dropTables();
		await createTables();
		await seedTables();
		// await createInitialTags(); now creating tags through createPost
	} catch (error) {
		console.log("Error during rebuildDB");
		throw error;
	}
}

rebuildDB();
