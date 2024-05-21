import { getCurrentInvoke } from "@codegenie/serverless-express";
import * as nest from "@nestjs/common";
import typia from "typia";
import { InspectOptions, inspect } from "util";
import winston from "winston";

import { Configuration } from "./config";

type LogMethod = (...messages: unknown[]) => void;

/** LoggerService interface */
type ILogger = Record<nest.LogLevel, LogMethod>;

type LogType = "FATAL" | "ERROR" | "WARN" | "LOG" | "VERBOSE" | "DEBUG";

interface IMessage {
    inputs: unknown[];
    options: InspectOptions;
}

const PRODUCTION_MODE = Configuration.NODE_ENV === "production";

const stringify = winston.format((info) => {
    if (typia.is<IMessage>(info))
        info.message = info.inputs
            .map((input) =>
                typeof input === "string"
                    ? input
                    : inspect(input, info.options),
            )
            .join(" ");
    return info;
})();

const timestamp = () =>
    new Date().toLocaleString("ko", { timeZone: "Asia/Seoul" });

const LAMBDA_TRANSPORT = new winston.transports.Stream({
    stream: process.stdout,
    format: winston.format.printf(
        (info) =>
            `[${info.level}] ${timestamp()} ${getCurrentInvoke().context?.awsRequestId}\r` +
            String(info.message).replaceAll("\n", "\r"),
    ),
});

const COLORIZE_TRANSPORT = new winston.transports.Stream({
    stream: process.stdout,
    format: winston.format.combine(
        winston.format.colorize({
            colors: {
                FATAL: "red",
                ERROR: "red",
                WARN: "yellow",
                LOG: "white",
                VERBOSE: "white",
                DEBUG: "white",
            } satisfies Record<LogType, "red" | "yellow" | "white">,
            message: true,
        }),
        winston.format.printf(
            (info) => `[${info.level}] ${timestamp()} ${info.message}`,
        ),
    ),
});

const winstonLogger = winston.createLogger({
    levels: {
        FATAL: 0,
        ERROR: 1,
        WARN: 2,
        LOG: 3,
        VERBOSE: 4,
        DEBUG: 5,
    } satisfies Record<LogType, number>,
    format: stringify,
    level: PRODUCTION_MODE ? "LOG" : "DEBUG",
    transports: PRODUCTION_MODE ? LAMBDA_TRANSPORT : COLORIZE_TRANSPORT,
});

const write =
    (level: LogType, options: InspectOptions = {}) =>
    (...inputs: unknown[]): void => {
        winstonLogger.log(level, { inputs, options } satisfies IMessage);
    };

export const logger = Object.freeze<ILogger>({
    fatal: write("FATAL", { colors: false, sorted: false }),
    error: write("ERROR", { colors: false, sorted: false }),
    warn: write("WARN", { colors: false, sorted: false }),
    log: write("LOG", { colors: !PRODUCTION_MODE, sorted: false }),
    verbose: write("VERBOSE", { colors: true, sorted: false, depth: null }),
    debug: write("DEBUG", {
        colors: true,
        sorted: false,
        depth: null,
        showHidden: true,
        showProxy: true,
        maxArrayLength: null,
        numericSeparator: true,
    }),
});
