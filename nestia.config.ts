import type nestia from "@nestia/sdk";

const NESTIA_CONFIG: nestia.INestiaConfig = {
    input: "src/**/*.controller.ts",
    output: "./sdk",
    simulate: false,
    propagate: false,
    clone: true,
    primitive: true,
    json: false,
    swagger: {
        decompose: true,
        output: "docs/swagger.json",
        servers: [
            { url: "http://localhost:4000", description: "Local Server" },
        ],
        security: {
            bearer: {
                type: "http",
                scheme: "bearer",
            },
        },
    },
};

export default NESTIA_CONFIG;
