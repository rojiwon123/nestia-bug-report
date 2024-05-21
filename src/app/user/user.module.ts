import * as nest from "@nestjs/common";

import { DBModule } from "@SRC/infrastructure/db/db.module";

import { UsersController } from "./user.controller";
import { UserService } from "./user.service";

@nest.Module({
    imports: [DBModule],
    providers: [UserService],
    controllers: [UsersController],
})
export class UserModule {}
