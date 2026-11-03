const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// USER REGISTRATION
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users(name,email,password) VALUES(?,?,?)",
            [name, email, hashed],
            (err, result) => {
                if (err) {
                    console.log("Registration Error:", err.message);

                    return res.status(500).json({
                        message: err.message
                    });
                }

                res.status(201).json({
                    message: "Registration successful"
                });
            }
        );

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// USER LOGIN
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const user = result[0];

            const valid = await bcrypt.compare(
                password,
                user.password
            );

            if (!valid) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({
                message: "Login successful",
                token
            });
        }
    );
};