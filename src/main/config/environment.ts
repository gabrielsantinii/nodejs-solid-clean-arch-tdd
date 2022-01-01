import dotenv from "dotenv";
let environment = {} as Environment;

export const setupEnvironment = async (): Promise<void> => {
    const envResult = dotenv.config();

    if (envResult.error) throw new Error(envResult.error.name);

    environment = {
        port: Number(process.env.PORT || 8080) as number,
        mongoUri: process.env.MONGO_URI as string,
        type: process.env.NODE_ENV || ("PROD" as any),
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID as string,
        firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY as string,
        firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        firebaseWebApiKey: process.env.FIREBASE_WEB_API_KEY as string
    };
};

type Environment = {
    port: number;
    mongoUri: string;
    type: EnvironmentType;
    firebaseProjectId: string;
    firebasePrivateKey: string;
    firebaseClientEmail: string;
    firebaseWebApiKey: string
};

type EnvironmentType = "PROD" | "DEV";

export { environment, EnvironmentType };
