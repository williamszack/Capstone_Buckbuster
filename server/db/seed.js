const { client } = require("./client");

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
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            admin BOOLEAN DEFAULT false
        );
        CREATE TABLE products (
            product_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            price DECIMAL(10,2),
            genre VARCHAR(255),
            quantity INT,
            image_url VARCHAR(255),
            active BOOLEAN DEFAULT true
        );
        CREATE TABLE orders (
            order_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            user_id INT,
            product_id INT,
            quantity INT,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        );
        CREATE TABLE cart (
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
		// Seed users table
		console.log("Starting to create users...");
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
        INSERT INTO products (name, description, price, genre, quantity, image_url, active)
        VALUES ('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 9.99, 'Drama', 100, 'https://m.media-amazon.com/images/I/51KjbtEkoeL._AC_.jpg', true),
               ('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 12.99, 'Crime', 50, 'https://ntvb.tmsimg.com/assets/p6326_v_h8_be.jpg?w=1280&h=720', true),
               ('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 14.99, 'Action', 75, 'https://www.prime1studio.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/h/d/hdmmdc-02_a19.jpg', true),
               ('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 12.99, 'Thriller', 50, 'https://i.ytimg.com/vi/herRuccntNE/movieposter_en.jpg',true),
               ('The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 9.99, 'Science Fiction', 100, 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', true),
               ('The Silence of the Lambs', 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.', 8.99, 'Thriller', 25, 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', true),
               ('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 11.99, 'Crime', 60, 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg', true),
               ('The Lord of the Rings: The Fellowship of the Ring', 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.', 17.99, 'Fantasy', 40, 'https://m.media-amazon.com/images/I/A1yy50fuVnL._RI_.jpg', true),
               ('Jurassic Park', 'A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the parks cloned dinosaurs to run loose.', 7.99, 'Science Fiction', 90, 'https://m.media-amazon.com/images/I/51A5QHDJQWL.jpg', true),
               ('The Departed', 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.', 13.99, 'Crime', 55, 'https://dtvimages.hs.llnwd.net/e1/db_photos/movies/AllPhotosAPGI/162564/162564_aa.jpg', false),
               ('Happy Tree Friends: First Blood', 'The cute and cuddly residents of Happy Tree Friends are back, this time with even more blood and gore as they embark on a series of horrific misadventures that will leave you cringing and laughing at the same time.', 10000000.00, 'Animation', 20, 'https://m.media-amazon.com/images/M/MV5BYTYwMTcyYjMtYzMwMS00OWY2LWFhMmQtZjY5OTE1MWM4ZTY4XkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_.jpg', true)
      `);

		//   ('Happy Tree Friends: First Blood', 'The cute and cuddly residents of Happy Tree Friends are back, this time with even more blood and gore as they embark on a series of horrific misadventures that will leave you cringing and laughing at the same time.', 6.99, 'Animation', 20, 'https://m.media-amazon.com/images/M/MV5BYTYwMTcyYjMtYzMwMS00OWY2LWFhMmQtZjY5OTE1MWM4ZTY4XkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_.jpg', true)

		console.log("Finished creating products...");
		// }

		// Seed orders table
		// async function createInitialOrders() {
		console.log("Starting to create orders...");
		await client.query(`
        INSERT INTO orders (user_id, product_id, quantity)
        VALUES (1, 1, 2),
               (2, 3, 1)
      `);
		console.log("Finished creating orders...");
		// }

		// Seed cart table
		// async function createInitialCart() {
		console.log("Starting to create carts...");
		await client.query(`
        INSERT INTO cart (user_id, product_id)
        VALUES (1, 2),
               (1, 1),
               (2, 1),
               (2, 2),
               (2, 3),
               (2, 1)
      `);
		console.log("Finished creating carts...");
		// }

		// Seed reviews table
		// async function createInitialReviews() {
		console.log("Starting to create reviews...");
		await client.query(`
        INSERT INTO reviews (user_id, product_id, title, description, rating)
        VALUES (1, 1, 'Amazing movie!', 'I loved this movie from start to finish. The acting was superb and the storyline kept me engaged throughout.', 5),
               (2, 3, 'One of the best superhero movies ever', 'This movie had everything - great action, amazing performances, and a compelling story. Highly recommended!', 4),
               (1, 3, 'One of the best superhero movies ever', 'This movie had everything - great action, amazing performances, and a compelling story. Highly recommended!', 4)
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
