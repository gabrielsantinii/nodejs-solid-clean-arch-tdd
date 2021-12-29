import dotenv from "dotenv";
let environment = {} as Environment;

export const setupEnvironment = async (): Promise<void> => {
    const envResult = dotenv.config();

    if (envResult.error) throw new Error(envResult.error.name);

    environment = {
        port: Number(process.env.PORT || 8080) as number,
        mongoUri: process.env.MONGO_URI as string,
        type: process.env.NODE_ENV || "PROD" as any,
    };
};

type Environment = {
    port: number;
    mongoUri: string;
    type: EnvironmentType;
};

type EnvironmentType = "PROD" | "DEV"

export { environment, EnvironmentType };
