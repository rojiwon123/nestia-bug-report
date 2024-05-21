import { Backend } from "./backend";
import { logger } from "./infrastructure/logger";

const bootstrap = () =>
    Backend.start({ logger, cors: { credentials: false } })
        .then(Backend.listen)
        .catch(logger.fatal);

void bootstrap();
