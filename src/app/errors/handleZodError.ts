import { ZodError, ZodIssue } from "@rakhal/validation-schemas";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError):TGenericErrorResponse => {
    const statusCode = 400;
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue?.message,
      };
    });
    return {
      statusCode,
      message: "Common Validation Error",
      errorSources,
    };
  };
  export default handleZodError