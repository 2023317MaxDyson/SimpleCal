const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");


// Signup an account 

exports.SignupAccount = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            // Don't let someone sign up if either their email OR their username is already being used.
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username or email is already registered"
            });
        }
        
         // Check password length
   if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long"
     });
   }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Account created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};






  // Login
  
  exports.LoginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            token
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};