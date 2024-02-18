import express from 'express';
import 'dotenv/config';
import { createUserHandler, loginStatusHandler, logoutHandler, verifyUserHandler } from '../controllers/User.js';
const router = express.Router();
router.post('/createUser', createUserHandler);
router.post('/verifyUser', verifyUserHandler);
// the below function is required for checking the login status or securing the path at times when we are not calling an api at the first render or useEffect. For example in /dashboard endpoint where at the time of loading the page we are calling the api which is using fetchUser middleware for checking the login status but in the dropZone component we arent calling any api at the first render which is why we need to use the below function and use it in use effect
router.post("/checkLoginStatus", loginStatusHandler);
router.get("/logout", logoutHandler);
export default router;
//# sourceMappingURL=authRoutes.js.map