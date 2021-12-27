import dotenv from "dotenv";
let environment = {} as Environment;

export const setupEnvironment = async (): Promise<void> => {
    const envResult = dotenv.config();

    if (envResult.error) throw new Error(envResult.error.name);
    
    environment = {
        port: Number(process.env.PORT || 8080) as number,
        mongoUri: process.env.MONGO_URI as string,
        test: !!process.env.TEST as boolean,
    };
};

type Environment = {
    port: number;
    mongoUri: string;
    test: boolean;
};

export { environment };
