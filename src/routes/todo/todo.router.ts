import express from "express";
import { postTodo } from "./todo.controller";

const todoRouter = express.Router();

todoRouter.post("/", postTodo);

export default todoRouter;
