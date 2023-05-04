const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const { requiredUser } = require("./utils");
const {
  getUserByUsername,
  createUser,
  getAllUsers,
  getUser,
  getUserById,
} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

/*-------api/users/health-------*/
usersRouter.get("/health", async (req, res) => {
  res.send({
    message: "users endpoint is working",
  });
});

//GET api/users/admin
usersRouter.get("/admin", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//POST api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const { username, password, name, email } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      res.send({
        error: "UserExistsError",
        message: "User " + username + " is already taken.",
        name: "UsernameExists",
      });
    } else if (password.length < 8) {
      res.send({
        error: "PasswordLengthError",
        message: "Password Too Short!",
        name: "Short Password",
      });
    } else {
      const user = await createUser({
        username,
        password,
        name,
        email,
        admin: false,
      });
      console.log("user", user);
      if (user) {
        const jwtToken = jwt.sign(user, JWT_SECRET);
        const response = {
          message: "thank you for signing up",
          token: jwtToken,
          user: {
            id: user.user_id,
            username: user.username,
          },
        };
        console.log("response", response);
        res.send(response);
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//POST api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      // const error = new Error("Please input a username and password");
      // error.status = 400;
      // throw error;
      res.status(400).send({
        error: "UnauthorizedError",
        message: "Please input a username and password",
        name: "UnauthorizedError",
      });
    }

    const user = await getUserByUsername(username);

    if (!user) {
      // const error = new Error("User not found");
      // error.status = 401;
      // throw error;
      res.status(400).send({
        error: "UnauthorizedError",
        message: "Invalid username",
        name: "UnauthorizedError",
      });
    }

    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordsMatch) {
      // const error = new Error("Incorrect password");
      // error.status = 401;
      // throw error;
      res.status(401).send({
        error: "UnauthorizedError",
        message: "Invalid password",
        name: "UnauthorizedError",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        username,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.send({
      user: {
        id: user.user_id,
        username: username,
      },
      token: token,
      message: "you're logged in!",
    });
  } catch (error) {
    next(error);
  }
});

//GET api/users/me
usersRouter.get("/me", requiredUser, async (req, res, next) => {
	const { user_id: id } = req.user;

	try {
		const user = await getUserById(id);
		if (!user) {
			res.status(404).send({
				error: "404 - IDNotFound",
				message: `User ID: ${user} does not exist`,
			});
			console.log(`User ID: ${user} does not exist`);
			return;
		}

		res.send({
			id: user.user_id,
			username: user.username,
			message: "Viewing your profile",
		});
		console.log(`Viewing profile ID: ${id}`);
	} catch (error) {
		next(error);
	}
});

module.exports = usersRouter;
