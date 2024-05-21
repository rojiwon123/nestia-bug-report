import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";

import { PrismaClient } from "@PRISMA";

import { Configuration } from "../config";
import { logger } from "../logger";

@Injectable()
export class PrismaService
    extends PrismaClient<{
        datasources: { database: { url: string } };
        log: [
            { emit: "event"; level: "error" },
            { emit: "event"; level: "warn" },
            //{ emit: "event"; level: "query" },
        ];
    }>
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        super({
            datasources: { database: { url: Configuration.DATABASE_URL } },
            log: [
                { emit: "event", level: "error" },
                { emit: "event", level: "warn" },
                // { emit: "event", level: "query" },
            ],
        });
        //   this.$on("query", logger.log);
        this.$on("error", logger.error);
        this.$on("warn", logger.warn);
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
