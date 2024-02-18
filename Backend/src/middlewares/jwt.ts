import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const fetchUser = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies && req.cookies.UserCookie
    console.log("Middleware for checking user: ", accessToken)

    if (!accessToken) {
        return res.status(400).json({
            success: false,
            message: "user isnt authenticated",
        })
    }

    try {
        const jwtSecret = process.env.JWT_SECRET || ''
        const data = jwt.verify(accessToken, jwtSecret, {complete: true});
        console.log("token1 ", data);
        // req.user = data.userId
        next()
    } catch (err) {
        return res.status(401).json({
            sucess: false,
            message: err.message,
        })
    }
}

export default fetchUser