import mongoose, { Document, Schema, Model } from "mongoose";

// ✅ Define the Student interface
export interface IStudent extends Document {
  name: string;
  marks: number;
  class: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ✅ Define the schema
const studentSchema: Schema<IStudent> = new Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    marks: { type: Number, required: true, min: 0, max: 100 },
    class: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Create and export the model
const Student: Model<IStudent> = mongoose.model<IStudent>("Student", studentSchema);
export default Student;
