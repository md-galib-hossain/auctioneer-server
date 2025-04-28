import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  FACEBOOK_ID: process.env.FACEBOOK_CLIENT_SECRET ,
  FACEBOOK_SECRET: process.env.FACEBOOK_CLIENT_ID ,
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET ,
  GOOGLE_ID: process.env.GOOGLE_CLIENT_ID ,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL ,
  BACKEND_URL: process.env.BACKEND_URL,
  FRONTEND_URL: process.env.FRONTEND_URL

};
