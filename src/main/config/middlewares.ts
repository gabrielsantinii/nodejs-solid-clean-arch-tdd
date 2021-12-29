import express from 'express';
import { bodyParser, contentType, cors } from '@/main/middlewares';

export const setupMiddlewares = (app: express.Application): void => {
    app.use(cors)
    app.use(bodyParser)
    app.use(contentType)
}