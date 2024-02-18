import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const createUserHandler = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(500).json({
            success: false,
            message: "Please fill all the details before submitting",
        });
    }
    let SearchUser = await User.findOne({ email: email });
    if (SearchUser) {
        return res.status(400).json({
            success: false,
            message: "sorry a user with the same email already exists"
        });
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const NewUser = await User.create({
            username,
            email,
            password: encryptedPassword,
        });
        console.log(NewUser);
        const payload = {
            userId: NewUser._id
        };
        const jwtSecret = process.env.JWT_SECRET || '';
        let authToken = jwt.sign(payload, jwtSecret);
        const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const cookieOptions = {
            expires: expirationDate,
            sameSite: true, // set it to Lax while running in local host and none in production
            secure: true, // set it to false while running in local host and true in production
            httpOnly: false,
        };
        res.cookie("UserCookie", authToken, cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Successfully signed up",
            userName: NewUser.username,
            jwt: authToken
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
};
const verifyUserHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({
            success: false,
            message: "Please fill all the details before submitting",
        });
    }
    try {
        const SearchUser = await User.findOne({ email: email });
        if (!SearchUser) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }
        const comparePassword = await bcrypt.compare(password, SearchUser.password);
        if (!comparePassword) {
            console.log("Incorrect password");
            return res.status(401).json({
                success: false,
                message: "Incorrect password, please double check before submitting",
            });
        }
        const payload = {
            userId: SearchUser._id
        };
        const options = {
            expiresIn: "60m",
        };
        const jwtSecret = process.env.JWT_SECRET || '';
        let authToken = jwt.sign(payload, jwtSecret, options);
        const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const cookieOptions = {
            expires: expirationDate,
            sameSite: true, // set it to Lax while running in local host and none in production
            secure: true, // set it to false while running in local host and true in production
            httpOnly: false,
        };
        res.cookie("UserCookie", authToken, cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Successfully Logged in",
            userName: SearchUser.username,
            jwt: authToken
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const logoutHandler = (req, res) => {
    try {
        console.log("LogOut Endpoint");
        const expirationDate = new Date(Date.now() - 1);
        const cookieOptions = {
            expires: expirationDate,
            sameSite: false,
            secure: false,
            httpOnly: false,
        };
        res.clearCookie("UserCookie", cookieOptions).status(200).json({
            success: true,
            message: "Successfully logged Out"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
const loginStatusHandler = (req, res) => {
    console.log("Check Login Status");
    const accessToken = req.cookies && req.cookies.UserCookie;
    if (!accessToken) {
        console.log("Cookie not found");
        return res.status(400).json({
            sucess: false,
            message: "user isnt authenticated",
        });
    }
    try {
        const jwtSecret = process.env.JWT_SECRET || '';
        const data = jwt.verify(accessToken, jwtSecret);
        console.log("token", data);
        return res.status(200).json({
            success: true,
            message: "User authentication successful"
        });
    }
    catch (err) {
        return res.status(400).json({
            sucess: false,
            message: "Cookie not present or expired",
        });
    }
};
export { createUserHandler, verifyUserHandler, logoutHandler, loginStatusHandler };
//# sourceMappingURL=User.js.map