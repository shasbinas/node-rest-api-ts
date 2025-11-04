import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// ✅ Define the User interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role?: string;
  age?: number;
  createdAt?: Date;
  updatedAt?: Date;

  matchPassword(enteredPassword: string): Promise<boolean>;
}

// ✅ Define the schema
const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    age: { type: Number },
  },
  { timestamps: true }
);

// ✅ Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare password method
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

// ✅ Create and export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
