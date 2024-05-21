import * as nest from "@nestjs/common";

import { PrismaService } from "@SRC/infrastructure/db/prisma.service";

@nest.Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    getList() {
        return this.prisma.users.findMany();
    }
}
