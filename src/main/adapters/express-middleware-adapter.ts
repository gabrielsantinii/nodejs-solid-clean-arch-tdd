import express from "express";
import { Middleware } from "@/presentation/protocols";
import { isErrorStatus, safeSpread } from "../helpers";

export const adaptMiddleware = (middleware: Middleware) => {
    return async (expressRequest: express.Request, expressResponse: express.Response, nextFunction: express.NextFunction) => {
        const request: any = {
            ...safeSpread(expressRequest.body),
            ...safeSpread(expressRequest.params),
            ...safeSpread(expressRequest.headers),
        };
        const httpResponse = await middleware.handle(request);
        expressResponse.statusCode = httpResponse.statusCode;

        if (isErrorStatus(httpResponse.statusCode)) {
            return expressResponse.json({ errors: httpResponse.body.map((e: Error) => e.message) });
        }

        // Object.assign(expressRequest, httpResponse.body);
        nextFunction();
    };
};
