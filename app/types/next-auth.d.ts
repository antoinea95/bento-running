import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {

  interface JWT {
    provider?: string
    accessToken?: string,
    accessTokenExpires: number,
    refreshToken: string
  }

  interface Account {
    expires_in: number
  }

  interface Session {
    id?:string,
    accessToken?: string,
  }
}
