import { environment, EnvironmentType } from "@/main/config";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const getMongoUri: Record<EnvironmentType, () => Promise<string>> = {
    DEV: async () => (await MongoMemoryServer.create()).getUri(),
    PROD: async () => environment.mongoUri,
};

export const setupMongoDb = async (): Promise<void> => {
    const uriToConnect = await getMongoUri[environment.type]();
    console.log(`Attempting to connect to MongoDB on ${environment.type} environment..`);
    await mongoose.connect(uriToConnect);
    console.log("MongoDB connected successfully.");
};
