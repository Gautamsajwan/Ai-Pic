import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import 'dotenv/config'

const createUserHandler = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(500).json({
            success: false,
            message: "Please fill all the details before submitting",
        })
    }

    let already_a_user = await User.findOne({ email: email });
    if (already_a_user) {
        return res.status(400).json({ 
            success: false,
            message: "sorry a user with the same email already exists" 
        })
    }

    try {
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: encryptedPassword,
        })

        console.log(newUser)

        const jwtSecret = process.env.JWT_SECRET
        const payload = { // storing the details of the newly created user in the token
            userId: newUser._id
        }
        let authToken = jwt.sign(payload, jwtSecret) // will return the created token

        const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            path: "/",
            domain: ".vercel.app",
            samesite: "none",
            maxAge: 86400000
        };
        res.cookie("UserCookie", authToken, cookieOptions)

        return res.status(200).json({
            success: true,
            message: "Successfully signed up",
            jwt: authToken
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const verifyUserHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({
            success: false,
            message: "Please fill all the details before submitting",
        });
    }

    try {
        const already_a_user = await User.findOne({ email: email });
        if (!already_a_user) {
            return res.status(404).json({
                success: false,
                message: "User doesnt exist: Please signup before login",
            });
        }

        const comparePassword = await bcrypt.compare(password, already_a_user.password);
        if (!comparePassword) {
            console.log("Incorrect password");
            return res.status(400).json({
                success: false,
                message: "Incorrect password, please double check before submitting",
            });
        }

        const jwtSecret = process.env.JWT_SECRET;
        const payload = {
            userId: already_a_user._id
        };
        let authToken = jwt.sign(payload, jwtSecret);

        const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            path: "/",
            domain: ".vercel.app",
            samesite: "none",
            maxAge: 86400000
        };
        res.cookie("UserCookie", authToken, cookieOptions)

        return res.status(200).json({
            success: true,
            message: "Successfully Logged in",
            jwt: authToken
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const logoutHandler = (req: Request, res: Response) => {
    try {
        console.log("LogOut Endpoint")

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
        })
    } catch(error) {
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        })
    } 
}

const loginStatusHandler = (req: Request, res: Response) => {
    console.log("Check Login Status");
    const authToken = req.cookies && req.cookies.UserCookie;

    if(!authToken) {
        return res.status(401).json({
            success: false,
            message: "Please login before continuing",
        })
    }

    try {
        const jwtSecret = process.env.JWT_SECRET
        jwt.verify(authToken, jwtSecret)

        return res.status(200).json({ 
            success: true, 
            message: "User authentication successful" 
        })
    } catch (err) {
        return res.status(401).json({
            sucess: false,
            message: err.message,
        })
    }
}

export { createUserHandler, verifyUserHandler, logoutHandler, loginStatusHandler }