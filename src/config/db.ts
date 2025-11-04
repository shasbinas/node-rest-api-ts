import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const { PG_USER, PG_HOST, PG_PASSWORD, PG_PORT, PG_DATABASE } = process.env;

    if (!PG_USER || !PG_HOST || !PG_DATABASE || !PG_PASSWORD) {
      throw new Error("❌ Missing PostgreSQL environment variables in .env");
    }

    const pool = new Pool({
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      password: PG_PASSWORD,
      port: Number(PG_PORT),
    });

    const client = await pool.connect();
    console.log(`✅ PostgreSQL Connected: ${PG_HOST}:${PG_PORT}`);
    console.log(`📂 Using Database: ${PG_DATABASE}`);
    client.release();

    return pool;
  } catch (error: any) {
    console.error(`❌ PostgreSQL Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
