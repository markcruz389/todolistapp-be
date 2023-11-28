import express from "express";

import api from "./routes/v1";

const app = express();

app.use(express.json());

app.use("/api/v1", api);

export default app;
