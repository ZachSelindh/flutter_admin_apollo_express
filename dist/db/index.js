import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const URL = `mongodb+srv://${process.env.MONGO_DB_FLUTTER_USERNAME}` +
    `:${process.env.MONGO_DB_FLUTTER_PASSWORD}@cluster0.ypen9fa.mongodb.net/` +
    `${process.env.MONGO_DB_FLUTTER_DB_NAME}?retryWrites=true&w=majority`;
export const dbConnection = mongoose
    .set('strictQuery', true)
    .connect(URL)
    .catch(error => console.log('Mongoose connection error:', error));
