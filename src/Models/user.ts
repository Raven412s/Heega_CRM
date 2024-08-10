// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define TypeScript interface for the User document
interface IUser extends Document {
  name: string;
  mobile: string;
  email: string;
  address: string;
  role: string;
  employeeJoiningDate?: Date;
  salary?: string;
  wage_advance?: string;
  employee_type?: string;
  aadharNumber: string;
  aadharCardFrontImage?: string;
  aadharCardBackImage?: string;
  customer_type?: string;
  customerJoiningDate?: Date;
  vendorJoiningDate?: Date;
  salesTarget?: string;
  shopName?: string;
  state?: string;
  city?: string;
  GST_Number: string;
  GST_Image?: string;
}

// Define the Mongoose schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
  employeeJoiningDate: { type: Date },
  salary: { type: String },
  wage_advance: { type: String },
  employee_type: { type: String },
  aadharNumber: { type: String },
  aadharCardFrontImage: { type: String },
  aadharCardBackImage: { type: String },
  customer_type: { type: String },
  customerJoiningDate: { type: Date },
  vendorJoiningDate: { type: Date },
  salesTarget: { type: String },
  shopName: { type: String },
  state: { type: String },
  city: { type: String },
  GST_Number: { type: String },
  GST_Image: { type: String }
});

// Create and export the Mongoose model
const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
