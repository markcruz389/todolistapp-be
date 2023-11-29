import { Response } from "express";

type ErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 500;
type ErrorType =
    | "Bad Request"
    | "Unauthorized"
    | "Forbidden"
    | "Conflict"
    | "Not Found"
    | "Internal Server Error";

type ErrorData = {
    type: ErrorType;
    message: string;
    errors?: Array<Record<string, any>>;
    stack?: string;
};

type CreateJsonErrorArgs = {
    res: Response;
    statusCode: ErrorStatusCode;
    errorData: ErrorData;
};

const ERROR_TYPE: Record<string, ErrorType> = {
    BAD_REQUEST: "Bad Request",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDER: "Forbidden",
    NOT_FOUND: "Not Found",
    CONFLICT: "Conflict",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
};
Object.freeze(ERROR_TYPE);

const errorResponse = (args: CreateJsonErrorArgs) => {
    const { res, statusCode, errorData } = args;
    return res.status(statusCode).json({ error: { ...errorData } });
};

const errorResponseServer = (res: Response) => {
    return errorResponse({
        res,
        statusCode: 500,
        errorData: {
            type: ERROR_TYPE.INTERNAL_SERVER_ERROR,
            message: "An unexpected error occured, Please try again later",
        },
    });
};

export {
    errorResponse,
    errorResponseServer,
    ERROR_TYPE,
    ErrorStatusCode,
    ErrorType,
    ErrorData,
};
