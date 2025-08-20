"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fetchUser = (req, res, next) => {
    const authToken = req.cookies && req.cookies.UserCookie;
    // console.log("Middleware for checking user: ", authToken)
    if (!authToken) {
        return res.status(401).json({
            success: false,
            message: "please login before continuing",
        });
    }
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT secret is not defined");
        }
        jsonwebtoken_1.default.verify(authToken, jwtSecret); // throws an error if jwt token is tampered
        next();
    }
    catch (err) {
        return res.status(401).json({
            sucess: false,
            message: err.message,
        });
    }
};
exports.default = fetchUser;
