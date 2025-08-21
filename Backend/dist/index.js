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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoDB_1 = __importDefault(require("./config/mongoDB"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        console.log('Origin:', origin);
        console.log('CORS_ORIGIN env:', process.env.CORS_ORIGIN);
        if (origin === process.env.CORS_ORIGIN) {
            callback(null, true);
        }
        else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"]
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
// routes
app.get('/', (req, res) => {
    res.send("hello world");
});
app.use('/dalle', imageRoutes_1.default);
app.use('/post', postRoutes_1.default);
app.use('/auth', authRoutes_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, mongoDB_1.default)();
        app.listen(port, () => {
            console.log(`server is listening on http://localhost:${port}`);
        });
    }
    catch (err) {
        console.error(err);
    }
});
startServer();
exports.default = app;
