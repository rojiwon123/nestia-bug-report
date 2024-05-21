import * as nest from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Response } from "express";

import { Exception } from "@SRC/common/exception";

import { logger } from "./logger";

@nest.Catch()
export class AllExceptionFilter implements nest.ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: nest.ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        if (exception instanceof Exception) {
            const status = exception.getStatus();
            const body = exception.body;
            logger.warn(exception);
            httpAdapter.reply(res, body, status);
            return;
        }

        if (this.isHttpException(exception)) {
            const status = exception.getStatus();
            const code = this.getNativeCode(status);
            const message = this.getMessageInResponse(exception.getResponse());
            logger.warn(exception);
            httpAdapter.reply(res, { code, message }, status);
            return;
        }

        logger.error(exception);
        httpAdapter.reply(
            res,
            { code: this.getNativeCode(500) },
            nest.HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }

    isHttpException(error: unknown): error is nest.HttpException {
        const prototype = Object.getPrototypeOf(error);
        if (typeof prototype === "object" && prototype !== null) {
            const name = prototype.constructor.name;
            if (name === "HttpException") return true;
            if (name === "Error" || name === "Object") return false; // 재귀 단축
            return this.isHttpException(prototype);
        }
        return false;
    }

    getNativeCode(
        status: number,
    ):
        | Exception.APINotFound["code"]
        | Exception.InputInvalid["code"]
        | Exception.InternalServerError["code"] {
        switch (status) {
            case 400:
                return "INPUT_INVALID";
            case 404:
                return "API_NOT_FOUND";
            default:
                return "INTERNAL_SERVER_ERROR";
        }
    }

    getMessageInResponse(response: string | object): string | undefined {
        if (typeof response !== "object" && response === null) return undefined;
        const message = (response as { message?: unknown })["message"];
        return typeof message === "string" ? message : undefined;
    }
}
