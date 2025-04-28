import { defineConfig } from "orval";

export default defineConfig({
  'main' : {
    input: "./api.yaml",
    output: {
        target: "./src/shared/api/generated",
        prettier: true,
        schemas: "./src/shared/api/generated/model",
        client: "swr",
        mode: "tags",
        override: {
          mutator: {
            path: "./src/shared/api/instance.ts",
            name: "apiInstance"
          }
        }
    }
  },
});
