import { TODO_STATUS } from "../../common/constants";
import Todo from "./todo.schema";

const createTodo = async (description: string) => {
    try {
        const todo = await Todo.create({
            description,
            status: TODO_STATUS.PENDING,
            isDeleted: false,
        });

        return todo.toJSON();
    } catch (error) {
        console.error(error);
    }
};

export { createTodo };
