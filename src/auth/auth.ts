import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserToken } from "@/utils/api";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials: any) {
        const token = await getUserToken(
          credentials.username,
          credentials.password,
        );
        if (token === null) {
          return null;
        }
        const user = {
          id: 1,
          name: credentials.username,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, credentials }) {
      const token = await getUserToken(
        // @ts-ignore
        credentials.username,
        // @ts-ignore
        credentials.password,
      );
      account!.access_token = token;
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
