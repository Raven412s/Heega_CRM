import mongoose, { Document, Schema } from 'mongoose';

interface IBasicUser extends Document {
  email: string;
  mobile: string;
  name: string;
  address: string;
  role: string;
  joiningDate: Date; // Add joiningDate field, make it optional if needed
}

const BasicUserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true },
    joiningDate: { type: Date, required: true }, // Make sure this field is defined
  });


  export default mongoose.models.BasicUser || mongoose.model<IBasicUser>('BasicUser', BasicUserSchema);
