import mongoose from 'mongoose';
import 'dotenv/config';
const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        const response = await mongoose.connect(mongoURI, {
            dbName: 'AiImageGenerator'
        });
        console.log(`database connected to ${response.connection.host}`);
    }
    catch (err) {
        console.error(err);
    }
};
export default connectDB;
//# sourceMappingURL=mongoDB.js.map