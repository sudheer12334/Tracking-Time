import { Schema, model, Document } from 'mongoose';

// Define a TypeScript interface for the User document
interface IUser extends Document {
    email: string;
    password: string;
}

// Create a Mongoose schema using the interface
const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create and export the Mongoose model using the schema and interface
const User = model<IUser>('User', userSchema);

export default User;
