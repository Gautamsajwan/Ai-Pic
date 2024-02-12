import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
const port = process.env.PORT || 5000;
const app = express();
connectDB();
// middlewares
app.use(cors());
app.use(express.json());
// routes
app.get('/', (req, res) => {
    res.send("hello world");
});
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map