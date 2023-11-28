import { TodoStatus } from "../models/todo/todo.schema";

const TODO_STATUS: Record<string, TodoStatus> = {
    PENDING: "pending",
    COMPLETED: "completed",
};

export { TODO_STATUS };
