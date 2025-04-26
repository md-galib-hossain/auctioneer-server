import { Prisma } from "@rakhal/db";
import { ZodError } from "@rakhal/validation-schemas";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import handleZodError from "../errors/handleZodError";
import AppError from "../errors/AppError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let statusCode = Number(httpStatus.INTERNAL_SERVER_ERROR);
  let success = false;
  let message =  err.message || "Something went wrong";
  let error =  err

  if(err instanceof Prisma.PrismaClientValidationError){
    message = 'Validation Error';
    error = err.message
  }

else if( err instanceof Prisma.PrismaClientKnownRequestError){

  if(err.code === 'P2002'){
    message = 'Duplication Error';
    error = err.meta;
    statusCode= httpStatus.CONFLICT
  }
  if(err.code === 'P2025'){
    message = 'Entity not found!';
    error = err.meta;
    statusCode= httpStatus.NOT_FOUND
  }
}else if (err instanceof ZodError) {
 
  const simplifiedError = handleZodError(err);
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  error = simplifiedError?.errorSources;
}
else if(err instanceof AppError){ //App error
  statusCode = err?.statusCode
  message = err?.message
  error = [{
    path : '',
    message: err?.message
  }]
}else if(err instanceof Error){ //Error
  message = err?.message
  error = [{
    path : '',
    message: err?.message
  }]
}
  res.status(statusCode).json({
    success,
    message,
    error,
  });
};
export default globalErrorHandler;
