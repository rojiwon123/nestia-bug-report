import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { AllExceptionFilter } from "./all_exception.filter";
import { DBModule } from "./db/db.module";

@Module({
    imports: [DBModule],
    providers: [{ provide: APP_FILTER, useClass: AllExceptionFilter }],
})
export class InfraModule {}
