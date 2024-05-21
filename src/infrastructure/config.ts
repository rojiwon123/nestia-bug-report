import dotenv from "dotenv";
import typia from "typia";

const init = () => {
    switch (process.env["NODE_ENV"]) {
        case "development":
            dotenv.config({ path: ".env", override: true });
            break;
        case "test":
            dotenv.config({ path: ".env.test", override: true });
            break;
        case "production":
            break;
        default:
            throw Error(
                "NODE_ENV should be one of (development|production|test)",
            );
    }

    return process.env["NODE_ENV"] === "test"
        ? ({
              PORT: 4000,
              ...process.env,
          } as unknown as IEnv)
        : typia.assert<IEnv>({ PORT: 4000, ...process.env });
};
export const Configuration: IEnv = init();

interface IEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    /** @default 4000 */
    readonly PORT: number;
    readonly DATABASE_URL: string;
}
