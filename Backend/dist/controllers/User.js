"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginStatusHandler = exports.logoutHandler = exports.verifyUserHandler = exports.createUserHandler = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(500).json({
            success: false,
            message: "Please fill all the details before submitting",
        });
    }
    let already_a_user = yield user_1.default.findOne({ email: email });
    if (already_a_user) {
        return res.status(400).json({
            success: false,
            message: "sorry a user with the same email already exists"
        });
    }
    try {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const encryptedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = yield user_1.default.create({
            username,
            email,
            password: encryptedPassword,
        });
        console.log(newUser);
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const payload = {
            userId: newUser._id
        };
        let authToken = jsonwebtoken_1.default.sign(payload, jwtSecret); // jwt.sign method will return the created token
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false,
            path: "/",
            samesite: "Lax",
        };
        res.cookie("UserCookie", authToken, cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Successfully signed up",
            jwt: authToken
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.createUserHandler = createUserHandler;
const verifyUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({
            success: false,
            message: "Please fill all the details before submitting",
        });
    }
    try {
        const already_a_user = yield user_1.default.findOne({ email: email });
        if (!already_a_user) {
            return res.status(404).json({
                success: false,
                message: "User doesnt exist: Please signup before login",
            });
        }
        const comparePassword = yield bcryptjs_1.default.compare(password, already_a_user.password);
        if (!comparePassword) {
            console.log("Incorrect password");
            return res.status(400).json({
                success: false,
                message: "Incorrect password, please double check before submitting",
            });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const payload = {
            userId: already_a_user._id
        };
        let authToken = jsonwebtoken_1.default.sign(payload, jwtSecret);
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            secure: true,
            path: "/",
            samesite: "Lax",
        };
        res.cookie("UserCookie", authToken, cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Successfully Logged in",
            jwt: authToken
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
exports.verifyUserHandler = verifyUserHandler;
const logoutHandler = (req, res) => {
    const authToken = req.cookies && req.cookies.UserCookie;
    if (!authToken) {
        return res.status(401).json({
            success: false,
            message: "User successfully logged out",
        });
    }
    try {
        console.log("LogOut Endpoint");
        const cookieOptions = {
            expires: new Date(Date.now() - 1),
            secure: true,
            httpOnly: true,
            path: "/",
            samesite: "none"
        };
        return res.clearCookie("UserCookie", cookieOptions).status(200).json({
            success: true,
            message: "Successfully logged Out"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
exports.logoutHandler = logoutHandler;
const loginStatusHandler = (req, res) => {
    console.log("Check Login Status");
    const authToken = req.cookies && req.cookies.UserCookie;
    if (!authToken) {
        return res.status(401).json({
            success: false,
            message: "Please login before continuing",
        });
    }
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        jsonwebtoken_1.default.verify(authToken, jwtSecret);
        return res.status(200).json({
            success: true,
            message: "User authentication successful"
        });
    }
    catch (err) {
        return res.status(401).json({
            sucess: false,
            message: err.message,
        });
    }
};
exports.loginStatusHandler = loginStatusHandler;
