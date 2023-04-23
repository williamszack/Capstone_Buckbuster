const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db");

//*Middleware helper function for required log-in
const requiredUser = async (req, res, next) => {
	//*client request with token value in header set as new const variable 'token'
	const token = req.headers['access-token'];
	console.log("TOKEN VALUE", token);
	//*Sends error response if request sent without token
	if (!token) {
		res.status(401).send({
			error: "UnauthorizationError",
			name: "401 - Unauthorized",
			message: "You must be logged in to perform this action",
		});
	} else {
		//*if request sent with token, proceed...
		try {
			//*Verify token with 'JWT_SECRET'
			const decoded = jwt.verify(token, JWT_SECRET);

			//*Assign 'user_id' from decoded token as new const variable 'id'
			const id = decoded.user_id;
			//*New const variable 'id' used as param in 'getUserById' function to fetch user data
			const user = await getUserById(id);
			//*Check if 'user' is in DB, else sends error
			if (!user) {
				res.send({
					error: "UnauthorizedError",
					message: "User not found",
					name: "UnauthorizedError",
				});
			}

			//*Re-assigns 'user' variable as 'req.user' for client request to be identified as logged in user
			req.user = user;
			console.log("REQ.USER", req.user);
			next();
		} catch (error) {
			next(error);
		}
	}
};

module.exports = { requiredUser };