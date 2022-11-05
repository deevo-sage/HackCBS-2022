import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://hackcbs-2022-backend-development.up.railway.app/graphql",
  documents: '"./graphql/**/*.graphql"',
  generates: {
    "graphql/generated-types/graphql-operations.ts": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
