"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const User_1 = require("../controllers/User");
const router = express_1.default.Router();
router.post('/signup', User_1.createUserHandler);
router.post('/login', User_1.verifyUserHandler);
// the below function is required for checking the login status or securing the path at times when we are not calling an api at the first render or useEffect.
router.post("/checkAuthStatus", User_1.loginStatusHandler);
router.post("/logout", User_1.logoutHandler);
exports.default = router;
