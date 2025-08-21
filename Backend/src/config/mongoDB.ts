import mongoose from 'mongoose'
import 'dotenv/config'

const mongoURI = process.env.MONGO_URI || ''

const connectDB = async() => {
    mongoose.set('strictQuery', true)
    
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
        console.log('Database already connected')
        return
    }
    
    try {
        const response = await mongoose.connect(mongoURI, {
            dbName: 'AiImageGenerator',
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            maxPoolSize: 10, // Connection pool
            retryWrites: true,
            retryReads: true,
            bufferCommands: false // Disable mongoose buffering
        })
        console.log(`database connected successfully to ${response.connection.host}`)
    } catch (err) {
        console.error('MongoDB connection error:', err)
        throw err // Re-throw to prevent server from starting without DB
    }
}

export default connectDB