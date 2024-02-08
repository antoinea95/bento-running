import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import StravaProvider from "next-auth/providers/strava";

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Client id or secret are not valid");
}

async function refreshAccessToken(token: JWT) {
    try {
        const url = "https://www.strava.com/oauth/token";
        const params = new URLSearchParams({
            client_id: clientId!,
            client_secret: clientSecret!,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
        });

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            body: params.toString(), // Convert parameters to a query string
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: new Date(refreshedTokens.expires_at * 1000),
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions: NextAuthOptions = {
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
          scope: "activity:read_all,profile:read_all",
          approval_prompt: "auto",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        token.accessToken = account.access_token
        token.accessTokenExpires = new Date(account.expires_at! * 1000);
        token.refreshToken = account.refresh_token
        token.user = user;
        }
         // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    session: async ({ session, token }) => {
      session.id = token.sub;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
