import express from "express";

import { httpGetTodos, httpPostTodo, httpPutTodo } from "./todo.controller";
import validateInput from "../../middlewares/validateInput";
import {
    httpGetTodosInputSchema,
    httpPostTodoInputSchema,
    httpPutTodoParamsSchema,
    httpPutTodoBodySchema,
} from "./todo.validators";

const todoRouter = express.Router();

todoRouter.get(
    "/",
    validateInput({ query: httpGetTodosInputSchema }),
    httpGetTodos
);

todoRouter.post(
    "/",
    validateInput({ body: httpPostTodoInputSchema }),
    httpPostTodo
);

todoRouter.put(
    "/:id",
    validateInput({
        // params: httpPutTodoParamsSchema,
        body: httpPutTodoBodySchema,
    }),
    httpPutTodo
);

export default todoRouter;
