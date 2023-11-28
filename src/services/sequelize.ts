import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "todolist_db",
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        dialect: "sqlite",
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        storage: "./db/todolistdb.sqlite",
    }
);

export default sequelize;
