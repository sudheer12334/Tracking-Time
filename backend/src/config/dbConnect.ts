import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = (): Promise<typeof mongoose> => {
    const mongoUrl = process.env.MONGOURL;
    if (!mongoUrl) {
        throw new Error('MONGOURL is not defined in environment variables');
    }
    return mongoose.connect(mongoUrl, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    });
};

export default connect;
