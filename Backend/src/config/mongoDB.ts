import mongoose from 'mongoose'
import 'dotenv/config'

const mongoURI = process.env.MONGO_URI

const connectDB = async() => {
    mongoose.set('strictQuery', true)
    try {
        const response = await mongoose.connect(mongoURI, {
            dbName: 'AiImageGenerator'
        })
        console.log(`database connected successfully`)
        // console.log(`database connected to ${response.connection.host}`)
    } catch (err) {
        console.error(err)
    }
}

export default connectDB