import { StrapiErrorT } from '@/types/strapi/StrapiError';
import { StrapiLoginResponseT } from '@/types/strapi/User';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import generateRandomString from '@/components/auth/signup/generateRandomString';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'email and password',
      credentials: {
        identifier: {
          label: 'Email or username *',
          type: 'text',
        },
        password: { label: 'Password *', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.identifier || !credentials.password) {
          return null;
        }
        try {
          const strapiResponse = await fetch(
            `${process.env.STRAPI_BACKEND_URL}api/auth/local`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                identifier: credentials!.identifier,
                password: credentials!.password,
              }),
            }
          );

          if (!strapiResponse.ok) {
            const contentType = strapiResponse.headers.get('content-type');
            if (contentType === 'application/json; charset=utf-8') {
              const data: StrapiErrorT = await strapiResponse.json();
              throw new Error(data.error.message);
            } else {
              throw new Error(strapiResponse.statusText);
            }
          }

          const data: StrapiLoginResponseT = await strapiResponse.json();
          return {
            name: data.user.username,
            email: data.user.email,
            id: data.user.id.toString(),
            strapiUserId: data.user.id,
            blocked: data.user.blocked,
            strapiToken: data.jwt,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === 'google' && profile && 'email_verified' in profile) {
        if (!profile.email_verified) return false;
      }
      return true;
    },

    async jwt({ token, trigger, account, user, session }) {
      if (trigger === 'update' && session?.username) {
        token.name = session.username;
      }
      if (trigger === 'update' && session?.strapiToken) {
        token.strapiToken = session.strapiToken;
      }

      if (account) {
        if (account.provider === 'google') {
          try {
            const strapiResponse = await fetch(
              `${process.env.STRAPI_BACKEND_URL}api/auth/${account.provider}/callback?access_token=${account.access_token}`,
              { cache: 'no-cache' }
            );
            if (!strapiResponse.ok) {
              const strapiError: StrapiErrorT = await strapiResponse.json();
              throw new Error(strapiError.error.message);
            }
            const strapiLoginResponse: StrapiLoginResponseT = await strapiResponse.json();

            token.strapiToken = strapiLoginResponse.jwt;
            token.strapiUserId = strapiLoginResponse.user.id;
            token.provider = account.provider;
            token.blocked = strapiLoginResponse.user.blocked;

            if (!strapiLoginResponse.user.reflink) {
              const randomReflink = generateRandomString(9);
              await fetch(`${process.env.STRAPI_BACKEND_URL}api/users/${strapiLoginResponse.user.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${strapiLoginResponse.jwt}`,
                },
                body: JSON.stringify({ reflink: randomReflink }),
              });
              token.reflink = randomReflink;
            } else {
              token.reflink = strapiLoginResponse.user.reflink;
            }

          } catch (error) {
            throw error;
          }
        }
        if (account.provider === 'credentials') {
          token.strapiToken = user.strapiToken;
          token.strapiUserId = user.strapiUserId;
          token.provider = account.provider;
          token.blocked = user.blocked;
        }
      }
      return token;
    },
    async session({ token, session }) {
      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          domain: '.accishop.ru',
          path: '/',
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      },
      strapiToken: {
        name: `next-auth.strapi-token`,
        options: {
          domain: '.accishop.ru',
          path: '/',
          httpOnly: false, // Set to true if you want to prevent client-side access
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      },
      provider: {
        name: `next-auth.provider`,
        options: {
          domain: '.accishop.ru',
          path: '/',
          httpOnly: false, // Set to true if you want to prevent client-side access
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      },
      strapiUserId: {
        name: `next-auth.strapi-user-id`,
        options: {
          domain: '.accishop.ru',
          path: '/',
          httpOnly: false, // Set to true if you want to prevent client-side access
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      },
      blocked: {
        name: `next-auth.blocked`,
        options: {
          domain: '.accishop.ru',
          path: '/',
          httpOnly: false, // Set to true if you want to prevent client-side access
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      },
      callbackUrl: {
        name: `next-auth.callback-url`,
        options: {
          domain: '.accishop.ru',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      },
      csrfToken: {
        name: `next-auth.csrf-token`,
        options: {
          domain: '.accishop.ru',
          path: '/',
          httpOnly: false, // Set to true if you want to prevent client-side access
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
    error: '/authError',
  },
};
