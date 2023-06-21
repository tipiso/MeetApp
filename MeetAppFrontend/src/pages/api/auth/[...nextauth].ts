// @ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import axios from 'axios';

import { TOKEN_LIFE } from '@/utils/constants';
import { loginUrl } from '@/utils/url';
import { api } from '@/utils/axios';
import {signalRHandlers} from "@/services/SignalR";

const callbacks: {
  session: (session: any, token: any) => Promise<any>;
  jwt: (token: any, user: any) => Promise<any>;
  signIn: (user: any, account: any, metadata: any) => Promise<boolean>;
} = {};

callbacks.signIn = async function signIn({ user, ...rest }) {
  const signalR = signalRHandlers();
  signalR.createHubConnection(user);
  return true;
};

callbacks.jwt = async function jwt({ token, account, user }) {
  if (user) {
    token = { accessToken: user.token, username: user.username };
  }

  return token;
};

callbacks.session = async function session({ session, token, user }) {
  session.accessToken = token.accessToken;
  session.user.name = token.username;

  return session;
};

export const authOptions = {
  secret: 'arakis',
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
  events: {
     signOut(msg) {
      console.log("EVENTS: SIGNOUT")
      const signalR = signalRHandlers();
      signalR.stopHubConnection(msg.user);
    },
    signIn(msg) {
      console.log("EVENTS: SIGNIN")
      const signalR = signalRHandlers();
      signalR.createHubConnection(msg.user);
    }
  }
};

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, authOptions);
