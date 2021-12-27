import { setupApp, setupMongoDb, setupEnvironment, environment } from "@/main/config";

setupEnvironment()
    .then(() => {
        setupMongoDb()
            .then(() => {
                const app = setupApp();
                app.listen(environment.port, () => console.log("Server running on port: ", environment.port));
            })
            .catch((err) => console.log("Cannot connect to MongoDB. Error: ", err));
    })
    .catch((err) => console.log("Cannot config environment. Error: ", err));
