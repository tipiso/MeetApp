// @ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import axios from 'axios';

import { TOKEN_LIFE } from '@/utils/constants';
import { loginUrl } from '@/utils/url';

const callbacks: {
  session: (session: any, token: any) => Promise<any>;
  jwt: (token: any, user: any) => Promise<any>;
  signIn: (user: any, account: any, metadata: any) => Promise<boolean>;
} = {};

callbacks.signIn = async function signIn({ user, ...rest }) {
  console.log('signIn', user, rest);
  return true;
};

callbacks.jwt = async function jwt({ token, account, user }) {
  console.log('JWT', token, user);
  if (user) {
    token = { accessToken: user.token, username: user.username };
  }

  return token;
};

callbacks.session = async function session({ session, token, user }) {
  console.log('SESSION', token, user);
  session.accessToken = token.accessToken;
  session.user.username = token.username;

  return session;
};

export const authOptions = {
  secret: 'arakis',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const response = await axios.post(loginUrl, credentials);
        console.log(credentials, req, 'AUTHORIZE');
        if (response.status === 200) {
          return response.data;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
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

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, authOptions);
