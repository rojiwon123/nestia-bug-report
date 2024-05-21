import core from "@nestia/core";
import * as nest from "@nestjs/common";

@nest.Controller()
export class AppController {
    /**
     * nest application 상태 헬스체크용 API입니다.
     *
     * @summary health check
     * @tag system
     * @return Hello World!
     */
    @core.TypedRoute.Get("/health")
    async hello(): Promise<"Hello World!"> {
        return "Hello World!";
    }
}
