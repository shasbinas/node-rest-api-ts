import { Request, Response, NextFunction } from "express";
import Product, { IProduct } from "../models/product";

// ✅ Add product (book)
export const addProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, author, price, category, publisher, isbn, stock } = req.body;

    const product: IProduct = await Product.create({
      title,
      author,
      price,
      category,
      publisher,
      isbn,
      stock,
      // createdBy: req.user?._id
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// ✅ Get products with optional filters
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query: any = {};

    // Category filter (case-insensitive)
    if (req.query.category) {
      query.category = {
        $regex: new RegExp(`^${String(req.query.category).trim()}$`, "i"),
      };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// ✅ Update product
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error("Product not found"));
    }

    const { title, author, price, category, publisher, isbn, stock } = req.body;

    if (title) product.title = title;
    if (author) product.author = author;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (publisher) product.publisher = publisher;
    if (isbn) product.isbn = isbn;
    if (stock !== undefined) product.stock = stock;

    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// ✅ Delete product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error("Product not found"));
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
