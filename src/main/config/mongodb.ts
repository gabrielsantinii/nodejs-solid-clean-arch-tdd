import { environment } from "@/main/config";
import mongoose from "mongoose";

export const setupMongoDb = async (): Promise<void> => {
    console.log("Attempting to connect to MongoDB..");
    await mongoose.connect(environment.mongoUri as string);
    console.log("MongoDB connected successfully.");
};
