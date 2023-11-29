import { TODO_STATUS } from "../../common/constants";
import Todo, { TodoStatus } from "./todo.schema";

type TodosFIlter = {
    limit?: number;
    page?: number;
    status?: TodoStatus;
};

const getTodos = async ({
    limit = 10,
    page = 1,
    status = TODO_STATUS.PENDING,
}: TodosFIlter) => {
    const offset = (page - 1) * limit;

    let todos = await Todo.findAll({
        where: {
            isDeleted: false,
            status,
        },
        order: [["createdAt", "DESC"]],
        limit: limit + 1,
        offset,
    });

    const isLastPage = todos.length <= limit;
    todos = todos.slice(0, limit);

    return { todos, pageData: { isLastPage } };
};

const createTodo = async (description: string) => {
    const todo = await Todo.create({
        description,
        status: TODO_STATUS.PENDING,
        isDeleted: false,
    });

    return todo.toJSON();
};

const updateTodo = async (
    id: number,
    data: { description?: string; status?: TodoStatus; isDeleted?: boolean }
) => {
    const { description, status, isDeleted } = data;
    await Todo.update({ ...data }, { where: { id }, returning: true });
    const todo = await Todo.findByPk(id);

    return {
        ...todo?.dataValues,
        ...(description && { description }),
        ...(status && { status }),
        ...(isDeleted !== undefined && { isDeleted }),
    };
};

export { getTodos, createTodo, updateTodo };
