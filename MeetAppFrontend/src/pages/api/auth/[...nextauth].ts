import { NextApiRequest, NextApiResponse } from 'next';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { Account, Session, SessionStrategy, CallbacksOptions } from 'next-auth';

import { TOKEN_LIFE } from '@/utils/constants';
import { loginUrl } from '@/utils/url';
import { api } from '@/utils/axios';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { ApiUser, TokenObj } from '@/types/users';

const callbacks: {
  session?: (params: { session: Session; token: TokenObj }) => Promise<Session>;
  jwt?: (params: { token: TokenObj; user: ApiUser }) => Promise<TokenObj>;
  signIn?: (params: { user: ApiUser; account: Account; metadata: Metadata }) => Promise<boolean>;
} = {};

callbacks.signIn = async function signIn() {
  return true;
};

callbacks.jwt = async function jwt({ token, user }) {
  if (user) {
    token = { accessToken: user.token, username: user.username };
  }
  return token;
};

callbacks.session = async function session({ session, token }) {
  session.accessToken = token.accessToken;
  session.user.name = token.username;
  return session;
};

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const response = await api.post(loginUrl, credentials);
        if (response.status === 200) {
          return response.data;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: TOKEN_LIFE,
  },
  jwt: {
    maxAge: TOKEN_LIFE,
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks,
};

// @ts-ignore
export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, authOptions);
