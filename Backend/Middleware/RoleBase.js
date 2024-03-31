const jwt = require("jsonwebtoken");
require("dotenv").config();

const RoleBase = (permittedRoles) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.tokenSecretSign);
        if (permittedRoles.includes(decoded.role)) {
            req.userID = decoded.userID;
            req.userRole = decoded.role;
            next();
        } else {
            return res.status(403).send("You are not authorized for this route");
        }
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
};

module.exports = { RoleBase };