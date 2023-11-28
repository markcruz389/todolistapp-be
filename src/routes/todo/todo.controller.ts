import { Request, Response } from "express";

import { createTodo } from "../../models/todo/todo.model";

const postTodo = async (req: Request, res: Response) => {
    const { description } = req.body;

    const todo = await createTodo(description);

    return res.status(200).json(todo);
};

export { postTodo };
