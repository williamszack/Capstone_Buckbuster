const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db");

//*Middleware helper function for required log-in
const requiredUser = async (req, res, next) => {
	//*Sets variable of header upon request
	const authHeader = req.headers.authorization;
	console.log("auth header", authHeader);
	//*Sends error response if request not sent with header
	if (!authHeader) {
		res.status(401).send({
			error: "401 - UnauthorizationError",
			message: "You must be logged in to perform this action",
		});
		console.log("You must be logged in to perform this action");
		return;
	} else {
		//*Extract token by splitting header object and taking 2nd array as token value
		const token = authHeader.split(" ")[1];
		try {
			//*Verify token using 'JWT_SECRET'
			const decoded = jwt.verify(token, JWT_SECRET);

			//*Assign value of id from decoded token
			const userId = decoded.id;
			//*New const set and using 'userId' as param for fetching data 'getUserById'
			//*Check if 'user is in DB, and if not, if statement to handle error
			const user = await getUserById(userId);
			if (!user) {
				res.status(404).send({
					error: "404 - IDNotFound",
					message: `User ID: ${user} does not exist`,
				});
				console.log(`User ID: ${user} does not exist`);
				return;
			}

			//*Re-assigns 'user' value as 'req.user' for client request to be identified as logged in user
			req.user = user;
			console.log("REQ.USER", req.user);
			next();
		} catch (error) {
			next(error);
		}
	}
};

module.exports = { requiredUser };
