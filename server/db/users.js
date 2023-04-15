const client = require("./index");
const bcrypt = require("bcrypt");

//users databse functions

const SALT_COUNT = 10;

async function createUser({ name, email, username, password, admin }) {
	//do not show/offer admin select on FE register screen, autmatically set to default
	const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
	const create = { name, email, username, hashedPassword, admin };
	try {
		const {
			rows: [user],
		} = await client.query(
			`
        INSERT INTO users(name, email, username, password )
        VALUES ($1, $2, $3, $4, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `,
			[create.name, create.email, create.username, create.hashedPassword, create.admin]
		);
		delete user.password;
		return user;
	} catch (error) {
		console.error("Error creating user:", error);
	}
}

async function getUserByUsername(userName) {
	try {
		const {
			rows: [user],
		} = client.query(
			`
        SELECT *
        FROM users
        WHERE username = $1;
        `,
			[userName]
		);
		if (!user) {
			console.log(`${userName} does not exist`);
			return null;
		} else {
			return user;
		}
	} catch (error) {
		console.log("Error finding user:", error);
	}
}

async function getUser({ username, password }) {
	if (!username || !password) {
		console.log("Invalid credentials");
		return;
	}

	try {
		const user = await getUserByUsername(username);
		const hashedPassword = user.password;
		const passwordMatch = await bcrypt.compare(password, hashedPassword);
		if (!passwordMatch) {
			console.log("Invalid credentials");
			return null;
		} else {
			delete user.password;
		}

		return user;
	} catch (error) {
		console.error("Error finding user:", error);
	}
}

async function getUserById(userId) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
        SELECT *
        FROM users
        WHERE id = $1;
        `,
			[user]
		);
		if (!user) {
			console.log(`${userId} does not exist`);
			return null;
		} else {
			delete user.password;
		}

		return user;
	} catch (error) {
		console.log("Error finding id:", error);
	}
}

module.exports = {
	createUser,
	getUser,
	getUserByUsername,
	getUserById,
};
