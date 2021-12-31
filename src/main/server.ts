import { setupApp, setupMongoDb, setupEnvironment, environment, setupFirebase } from "@/main/config";
import {} from "./config/firebase";

setupEnvironment()
    .then(() => {
        setupMongoDb()
            .then(() => {
                setupFirebase()
                    .then(() => {
                        const app = setupApp();
                        app.listen(environment.port, () => console.log("Server running on port: ", environment.port));
                    })
                    .catch((err) => console.log("Cannot conect to Firebase. Error: ", err));
            })
            .catch((err) => console.log("Cannot connect to MongoDB. Error: ", err));
    })
    .catch((err) => console.log("Cannot config environment. Error: ", err));
