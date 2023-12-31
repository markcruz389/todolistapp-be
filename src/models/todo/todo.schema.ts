import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import sequelize from "../../services/sequelize";
import { TODO_STATUS } from "../../common/constants";

export type TodoStatus = "pending" | "completed";

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
    declare id: CreationOptional<number>;
    declare description: string;
    declare status: TodoStatus;
    declare isDeleted: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Todo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(TODO_STATUS.PENDING, TODO_STATUS.COMPLETED),
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    { sequelize, modelName: "Todo" }
);

export default Todo;
