import { Validator } from "express-json-validator-middleware";
import ajvKeywords from "ajv-keywords";

const { validate: validateInput, ajv } = new Validator({ coerceTypes: true });
ajvKeywords(ajv, ["transform"]);

export default validateInput;
