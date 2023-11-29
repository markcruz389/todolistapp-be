import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-json-validator-middleware";

import { errorResponse, ERROR_TYPE } from "../utils/errorResponse";

const validationErrorHandler = (
    error: Error,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ValidationError) {
        return errorResponse({
            res,
            statusCode: 400,
            errorData: {
                type: ERROR_TYPE.BAD_REQUEST,
                message: "Invalid input",
                errors: error.validationErrors.body as Array<
                    Record<string, any>
                >,
            },
        });
    }

    next(error);
};

export default validationErrorHandler;
