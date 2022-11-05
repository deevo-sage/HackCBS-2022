import urql, { createClient } from "urql";

export class UrqlClient {
  private static instance: UrqlClient;

  private constructor(
    private readonly client: ReturnType<typeof createClient>
  ) {}

  public static getInstance() {
    if (!UrqlClient.instance) {
      UrqlClient.instance = new UrqlClient(
        createClient({
          url:
            process.env.SERVER_URL ||
            "https://hackcbs-2022-backend-development.up.railway.app/graphql",
          requestPolicy: "network-only",
        })
      );
    }
    return UrqlClient.instance;
  }

  public getClient() {
    return this.client;
  }
}
