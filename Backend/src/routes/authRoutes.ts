import express from 'express'
import 'dotenv/config'
import { createUserHandler, loginStatusHandler, logoutHandler, verifyUserHandler } from '../controllers/User'
const router = express.Router()

router.post('/signup', createUserHandler)

router.post('/login', verifyUserHandler)

// the below function is required for checking the login status or securing the path at times when we are not calling an api at the first render or useEffect.
router.post("/checkAuthStatus", loginStatusHandler)

router.post("/logout", logoutHandler)

export default router