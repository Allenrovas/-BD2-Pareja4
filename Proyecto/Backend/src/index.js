import app from "./app.js";
import { API_PORT } from "./config/credentials.js";

app.listen(API_PORT);
console.log(`Server on port ${API_PORT}`);