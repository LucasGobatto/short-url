import { Request, Response } from "express";
import { ExpressErrorMiddlewareInterface } from "routing-controllers";

export class FormatErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, _request: Request, response: Response, next?: (error?: Error) => void) {
    const isBase = error.base;

    if (!isBase) {
      response.statusCode = 500;
      response.json({
        error: {
          details: "Internal Error",
          message: error.message,
        },
      });
      next();
      return;
    }

    response.statusCode = error?.code ?? 500;
    response.json({
      error: {
        details: error.details,
        message: error.message,
      },
    });
    next();
  }
}
