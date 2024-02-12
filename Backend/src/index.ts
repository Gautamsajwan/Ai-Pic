import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import dalleRoutes from './routes/dalleRoutes.js'
import postRoutes from './routes/postRoutes.js'

const port = process.env.PORT || 5000
const app = express()

// middlewares
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use('/dalle', dalleRoutes)
app.use('/post', postRoutes)

// routes
app.get('/', (req, res) => {
    res.send("hello world")
})

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