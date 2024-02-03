import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import StravaProvider from "next-auth/providers/strava";

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;

if (!clientId || !clientSecret) {
    throw new Error("Client id or secret are not valid");
}

export const authOptions : NextAuthOptions = {
    secret: process.env.NEXTAUTH_URL as string,
    providers: [
        StravaProvider({
            clientId: clientId,
            clientSecret: clientSecret,
            authorization: {
                url: "https://www.strava.com/oauth/authorize",
                params: {
                    client_id: clientId,
                    redirect_uri: process.env.STRAVA_REDIRECT_URI,
                    scope: "activity:read_all",
                    approval_prompt: "auto",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, account }) => {
            if (account) {
                token.id_token = account.id_token,
                token.provider = account.provider,
                token.accessToken = account.access_token
              }
              return token
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    pages: {
        signIn: "/signin",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
