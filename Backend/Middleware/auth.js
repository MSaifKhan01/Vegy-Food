const jwt = require("jsonwebtoken");

require("dotenv").config();

const Auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("Authorization Header:", authHeader);

    if (authHeader ) {
        const token = authHeader.split(" ")[1];
        // console.log("Token:", token);

        try {
            const decoded = jwt.verify(token, process.env.tokenSecretSign);
            // console.log("Decoded:", decoded);

            if (decoded) {
                req.userID = decoded.userID;
                // console.log("UserID:", req.userID);
                next();
            } else {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: "Please Login First",
                });
            }
        } catch (error) {
            console.error("Token Verification Error:", error);
            res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid Token",
            });
        }
    } else {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Bearer token is missing or invalid",
        });
    }
};

module.exports = {
    Auth
};
