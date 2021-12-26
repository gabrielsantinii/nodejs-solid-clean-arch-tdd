import { setupApp, environment } from "@/main/config";

const app = setupApp();
app.listen(environment.port, () => console.log("Server running on port: ", environment.port));
