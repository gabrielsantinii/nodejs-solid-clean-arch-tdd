import { Controller } from "@/presentation/protocols";
import express from "express";
import { isErrorStatus, safeSpread } from "@/main/helpers";

export const adaptRoute = (controller: Controller) => {
    return async (req: express.Request, res: express.Response) => {
        const request = { ...safeSpread(req.body), ...safeSpread(req.params) };
        const httpResponse = await controller.handle(request);
        res.statusCode = httpResponse.statusCode;

        if (isErrorStatus(httpResponse.statusCode)) {
            return res.json({ error: httpResponse.body.message });
        }

        return res.json(httpResponse.body);
    };
};
