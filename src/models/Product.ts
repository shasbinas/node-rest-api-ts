import mongoose, { Document, Schema, Model } from "mongoose";

// ✅ Define the Product interface
export interface IProduct extends Document {
  title: string;
  author: string;
  price: number;
  category?: string;
  publisher?: string;
  isbn?: string;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
  // createdBy?: mongoose.Types.ObjectId;
}

// ✅ Define the schema
const productSchema: Schema<IProduct> = new Schema(
  {
    title: { type: String, required: true, minlength: 2 },
    author: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String },
    publisher: { type: String },
    isbn: { type: String, unique: true },
    stock: { type: Number, default: 0, min: 0 },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
);

// ✅ Create and export the model
const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);
export default Product;
