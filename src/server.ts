import http from "node:http";
import dotenv from "dotenv";

import app from "./app";
// import sequelize from "./services/sequelize";

dotenv.config();

const PORT = process.env.SERVER_PORT;

const serverStart = () => {
    // sequelize
    //     .sync()
    //     .then(() => console.log("DB connected"))
    //     .catch((error) => console.log("DB error", error));

    const server = http.createServer(app);

    server.listen(PORT, () => console.log("Listening to port", PORT));
};

serverStart();
