import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const fetchUser = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.cookies && req.cookies.UserCookie

    if (!authToken) {
        return res.status(401).json({
            success: false,
            message: "please login before continuing",
        })
    }

    try {
        const jwtSecret = process.env.JWT_SECRET
        
        if (!jwtSecret) {
            throw new Error("JWT secret is not defined")
        }

        jwt.verify(authToken, jwtSecret); // throws an error if jwt token is tampered
        
        next()
    } catch (err: any) {
        console.error("JWT verification failed:", err.message)
        return res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

export default fetchUser