import express from "express";
import { Controller } from "@/presentation/protocols";
import { isErrorStatus, safeSpread } from "@/main/helpers";

export const adaptRoute = (controller: Controller) => {
    return async (expressRequest: express.Request, expressResponse: express.Response) => {
        const request = { ...safeSpread(expressRequest.body), ...safeSpread(expressRequest.params) };
        const httpResponse = await controller.handle(request);
        expressResponse.statusCode = httpResponse.statusCode;
        if (isErrorStatus(httpResponse.statusCode)) {
            return expressResponse.json({ errors: httpResponse.body.map((e: Error) => e.message) });
        }

        return expressResponse.json(httpResponse.body);
    };
};
