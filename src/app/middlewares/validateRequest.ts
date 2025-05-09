import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync(
          req
        );
        return next();
      } catch (err) {
        next(err);
      }
    };
  };
  export default validateRequest