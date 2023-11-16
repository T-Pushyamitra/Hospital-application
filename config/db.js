import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const env = process.env;

const uri = env.MONGO_DB_URI

const conn = mongoose.connect(uri)


export default conn;