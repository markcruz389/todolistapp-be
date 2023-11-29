import express from "express";
import cors from "cors";

import api from "./routes/v1";
import { errorResponse, ERROR_TYPE } from "./utils/errorResponse";
import errorHandler from "./middlewares/errorHandler";
import validationErrorHandler from "./middlewares/validationErrorHandler";

const app = express();

app.use(cors({ origin: "https://harmonious-sawine-548958.netlify.app" }));
app.use(express.json());

app.use("/api/v1", api);

app.use(validationErrorHandler);

app.use("*", (req, res) => {
    return errorResponse({
        res,
        statusCode: 404,
        errorData: {
            type: ERROR_TYPE.NOT_FOUND,
            message: `${req.baseUrl} not found`,
        },
    });
});

app.use(errorHandler);

export default app;
