import * as nest from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { RequestHandler } from "express";
import helmet from "helmet";
import { RequestListener } from "http";

import { AppModule } from "./app/app.module";
import { Configuration } from "./infrastructure/config";
import { logger } from "./infrastructure/logger";

export class Backend {
    private constructor(private readonly _app: nest.INestApplication) {}

    static async start(
        options: nest.NestApplicationOptions = {},
    ): Promise<Backend> {
        const app = await NestFactory.create(AppModule, options);
        const backend = new Backend(app);
        process.on("SIGINT", async () => {
            await backend.end();
            process.exit(0);
        });
        return backend
            .use(cookieParser())
            .use(helmet({ contentSecurityPolicy: true, hidePoweredBy: true }))
            .init();
    }

    private async init(): Promise<this> {
        await this._app.init();
        return this;
    }

    static async listen(backend: Backend): Promise<void> {
        await backend._app.listen(Configuration.PORT);
        logger.log(`Nest Application listening on ${Configuration.PORT}`);
    }

    use(middleware: RequestHandler): this {
        this._app.use(middleware);
        return this;
    }

    private async end() {
        await this._app.close();
        logger.log("Nest Application end");
        return;
    }

    getHttpListener(): RequestListener {
        return this._app.getHttpAdapter().getInstance();
    }
}
