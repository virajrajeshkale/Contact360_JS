const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc register the user
// @route POST/api/user/register
// @Access public 
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory..!");
    }

    const userAvailable = await User.findOne({ email });

    // if user email is found, it is already registered
    if (userAvailable) {
        res.status(400);
        throw new Error("User is already Registered.!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created successfully ${newUser}`);

    if (newUser) {
        res.status(201).json({ _id: newUser.id, email: newUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid..!");
    }
});

// @desc login the user
// @route POST/api/user/login
// @Access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory..!");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // payload or data field
        const accessToken = jwt.sign(
            {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                },
            },
            process.env.ACCESS_TOKEN_SECRET, // access token field
            { expiresIn: "15m" } // expiration token time
        );

        res.json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Please enter valid credentials..!");
    }
}); 

// @desc get current login user
// @route GET/api/user/current
// @Access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
