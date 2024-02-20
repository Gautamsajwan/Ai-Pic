import jwt from 'jsonwebtoken';
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
        jwt.verify(authToken, jwtSecret); // throws an error if jwt token is tampered
        next();
    }
    catch (err) {
        return res.status(401).json({
            sucess: false,
            message: err.message,
        });
    }
};
export default fetchUser;
//# sourceMappingURL=jwt.js.map