import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB'
import cookieParser from 'cookie-parser'
import dalleRoutes from './routes/imageRoutes'
import postRoutes from './routes/postRoutes'
import authRoutes from './routes/authRoutes'

const port = process.env.PORT || 5000
const app = express()

// middlewares
app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin:', origin);
    console.log('CORS_ORIGIN env:', process.env.CORS_ORIGIN);
    
    if (origin === process.env.CORS_ORIGIN) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"]
}));
app.use(express.json({limit: '50mb'}))
app.use(cookieParser())

// routes
app.get('/', (req, res) => {
    res.send("hello world")
})
app.use('/dalle', dalleRoutes)
app.use('/post', postRoutes)
app.use('/auth', authRoutes)

const startServer = async() => {
    try {
        connectDB()
        app.listen(port, () => {
            console.log(`server is listening on http://localhost:${port}`);
        })
    } catch(err) {
        console.error(err)
    }
}

startServer()