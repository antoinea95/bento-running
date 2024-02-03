import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {

  interface JWT {
    id_token?: string
    provider?: string
    accessToken?: string
  }

  interface Session {
      accessToken?: string,
  }
}
