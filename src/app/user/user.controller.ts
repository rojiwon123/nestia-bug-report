import core from "@nestia/core";
import * as nest from "@nestjs/common";

import { UserService } from "./user.service";

@nest.Controller("users")
export class UsersController {
    constructor(private readonly service: UserService) {}

    @core.TypedRoute.Get()
    getList() {
        return this.service.getList();
    }
}
