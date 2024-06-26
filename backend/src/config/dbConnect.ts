import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = (): Promise<typeof mongoose> => {
    const mongoUrl = process.env.MONGOURL + 'tracking-time';
    if (!mongoUrl) {
        throw new Error('MONGOURL is not defined in environment variables');
    }
    return mongoose.connect(mongoUrl);
};

export default connect;
