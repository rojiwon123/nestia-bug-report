import { Module } from "@nestjs/common";

import { InfraModule } from "@SRC/infrastructure/Infra.module";

import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";

@Module({
    imports: [InfraModule, UserModule],
    controllers: [AppController],
})
export class AppModule {}
