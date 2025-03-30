import { StrapiErrorT } from '@/types/strapi/StrapiError';
import { StrapiLoginResponseT } from '@/types/strapi/User';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
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
                        `${process.env.STRAPI_BACKEND_URL}/api/auth/local`,
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
            return true;
        },

        async jwt({ token, trigger, account, user, session }) {

            if (trigger === 'update' && session?.username) {
                token.name = session.username;
            }

            if (trigger === 'update' && session?.strapiToken) {
                token.strapiToken = session.strapiToken;
            }

            if (account && account.provider === 'credentials') {
                token.strapiToken = user.strapiToken;
                token.strapiUserId = user.strapiUserId;
                token.provider = account.provider;
                token.blocked = user.blocked;
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
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
        error: '/authError',
    },
};