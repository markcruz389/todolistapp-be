import { AllowedSchema } from "express-json-validator-middleware";
import { TODO_STATUS } from "../../common/constants";

const httpGetTodosInputSchema: AllowedSchema = {
    type: "object",
    properties: {
        limit: {
            type: "integer",
        },
        page: {
            type: "integer",
        },
        status: {
            type: "string",
            enum: [TODO_STATUS.PENDING, TODO_STATUS.COMPLETED],
        },
    },
    additionalProperties: false,
};

const httpPostTodoInputSchema: AllowedSchema = {
    type: "object",
    required: ["description"],
    properties: {
        description: {
            type: "string",
            allOf: [{ transform: ["trim"] }, { minLength: 1 }],
        },
    },
    additionalProperties: false,
};

const httpPutTodoParamsSchema: AllowedSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "integer",
        },
    },
    additionalProperties: false,
};

const httpPutTodoBodySchema: AllowedSchema = {
    type: "object",
    properties: {
        description: {
            type: "string",
        },
        status: {
            type: "string",
            enum: [TODO_STATUS.PENDING, TODO_STATUS.COMPLETED],
        },
        isDeleted: {
            type: "boolean",
        },
    },
    anyOf: [
        { required: ["description"] },
        { required: ["status"] },
        { required: ["isDeleted"] },
    ],
    additionalProperties: false,
};

export {
    httpGetTodosInputSchema,
    httpPostTodoInputSchema,
    httpPutTodoParamsSchema,
    httpPutTodoBodySchema,
};
