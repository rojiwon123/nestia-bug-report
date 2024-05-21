import * as nest from "@nestjs/common";

export class Exception<T extends IBody<string>> extends nest.HttpException {
    constructor(
        public readonly body: T,
        status: number,
    ) {
        super(body.message ?? body.code, status);
    }
}

interface IBody<T extends string> {
    readonly code: T;
    readonly message?: string;
}

export namespace Exception {
    export type InputInvalid = IBody<"INPUT_INVALID">;
    export type APINotFound = IBody<"API_NOT_FOUND">;
    export type InternalServerError = IBody<"INTERNAL_SERVER_ERROR">;

    export namespace Permission {
        export type Required = IBody<"PERMISSION_REQUIRED">;
        export type Invalid = IBody<"PERMISSION_INVALID">;
        export type Expired = IBody<"PERMISSION_EXPIRED">;
    }
    export namespace User {
        export type NotFound = IBody<"USER_NOT_FOUND">;
        export type AlreadyExist = IBody<"USER_ALREADY_EXIST">;
    }
    export namespace Article {
        export type NotFound = IBody<"ARTICLE_NOT_FOUND">;
    }
}
