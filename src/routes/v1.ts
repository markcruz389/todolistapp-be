import express from "express";

import todoRouter from "./todo/todo.router";

const api = express.Router();

api.use("/todos", todoRouter);

export default api;
