import { Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
export declare class LogginMiddleware implements NestMiddleware {
    logger: Logger;
    constructor();
    use(req: Request, res: Response, next: NextFunction): void;
}
