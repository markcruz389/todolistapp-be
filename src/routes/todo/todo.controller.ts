import { Request, Response } from "express";

import { getTodos, createTodo, updateTodo } from "../../models/todo/todo.model";
import { ERROR_TYPE, errorResponse } from "../../utils/errorResponse";
import { TodoStatus } from "../../models/todo/todo.schema";

const httpGetTodos = async (req: Request, res: Response) => {
    const { limit, page, status } = req.query;
    const args = {
        limit: Number(limit),
        page: Number(page),
        status: status as TodoStatus,
    };
    const data = await getTodos(args);

    return res.status(200).json({ todos: data.todos, pageData: data.pageData });
};

const httpPostTodo = async (req: Request, res: Response) => {
    const { description } = req.body;

    const todo = await createTodo(description);
    if (!todo) {
        return errorResponse({
            res,
            statusCode: 500,
            errorData: {
                type: ERROR_TYPE.INTERNAL_SERVER_ERROR,
                message: "Failed creating todo",
            },
        });
    }

    return res.status(200).json({ todo });
};

const httpPutTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { description, status, isDeleted } = req.body;
    console.log(id);
    const todo = await updateTodo(Number(id), {
        description,
        status,
        isDeleted,
    });

    return res.status(200).json({ todo });
};

export { httpGetTodos, httpPostTodo, httpPutTodo };
