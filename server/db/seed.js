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
               ('Happy Tree Friends: First Blood', 'The cute and cuddly residents of Happy Tree Friends are back, this time with even more blood and gore as they embark on a series of horrific misadventures that will leave you cringing and laughing at the same time.', 10000000.00, 'Animation', 20, 'https://m.media-amazon.com/images/M/MV5BYTYwMTcyYjMtYzMwMS00OWY2LWFhMmQtZjY5OTE1MWM4ZTY4XkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_.jpg', true),
               ('Forrest Gump', 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.', 10.99, 'Drama', 50, 'https://m.media-amazon.com/images/I/613ZgTigTpL.jpg', true),
               ('The Lion King', 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.', 9.99, 'Animation', 70, 'https://amc-theatres-res.cloudinary.com/v1579117342/amc-cdn/production/2/movies/2000/2048/Poster/p_800x1200_AMC_LionKingThe_10172019.jpg', true),
               ('The Green Mile', 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.', 10.99, 'Drama', 65, 'https://m.media-amazon.com/images/I/51GLlocYQ9L._AC_UF894,1000_QL80_.jpg', true),
               ('The Notebook', 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated due to their social differences.', 9.99, 'Romance', 40, 'https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg', true),
               ('The Great Gatsby', 'A writer and wall street trader, Nick, finds himself drawn to the past and lifestyle of his millionaire neighbor, Jay Gatsby.', 10.99, 'Drama', 45, 'https://cdn2.mhpbooks.com/2013/03/860841_506569139385506_1114455028_o.jpg', true),
               ('Titanic', 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', 8.99, 'Romance', 90, 'https://cdn-egkmb.nitrocdn.com/VUvTbPYfGAhWmImLjXmdrLmedadbKdrI/assets/images/optimized/rev-f18c9af/wp-content/uploads/2022/12/titanic-movie-poster.jpg', true),
               ('The Social Dilemma', 'Explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.', 9.99, 'Documentary', 40, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuefNAz3WKYakkMQFsb0Gdp_MnMCcSrSZxtwkVHeXikyLQaSR7BrxH01tavTAhLPqCaEE&usqp=CAU', true),
               ('Goodfellas', 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.', 8.99, 'Crime', 55, 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg', true),
               ('Eternal Sunshine of the Spotless Mind', 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.', 10.99, 'Romance', 45, 'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_.jpg', true),
               ('The Matrix Reloaded', 'Neo and his allies race against time before the machines discover Zion and destroy it. While seeking the truth about the Matrix, Neo must save Trinity from a dark fate.', 12.99, 'Science Fiction', 50, 'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', true),
               ('The Conjuring', 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.', 9.99, 'Horror', 60, 'https://www.roguecinema.com/wp-content/uploads/2018/08/the-conjuring-356x468_c.jpg', true),
               ('The Wolf of Wall Street', 'Based on the true story of Jordan Belfort, from his rise to a wealthy stockbroker living the high life to his fall involving crime, corruption, and the federal government.', 11.99, 'Biography', 55, 'https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg', true),
               ('Fight Club', 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.', 9.99, 'Drama', 70, 'https://m.media-amazon.com/images/I/81D+KJkO4SL._AC_UF894,1000_QL80_.jpg', true),
               ('The Shining', 'A family heads to an isolated hotel for the winter, where an evil and spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.', 9.99, 'Horror', 70, 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg', true)
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
