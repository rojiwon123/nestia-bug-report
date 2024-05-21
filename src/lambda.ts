import sls from "@codegenie/serverless-express";
import { Handler } from "aws-lambda";

import { Backend } from "./backend";

let _handler: Handler | null = null;

const bootstrap = async (): Promise<Handler> => {
    const app = await Backend.start({ logger: false });
    return sls({ app: app.getHttpListener() });
};

export const handler: Handler = async (event, context, callback) => {
    if (_handler === null) _handler = await bootstrap();
    return _handler(event, context, callback);
};
