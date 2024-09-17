import NextAuth, { NextAuthOptions } from "next-auth"

declare module "next-auth/jwt" {
    interface JWT {
        provider: string;
        idToken: string;
        accessToken: string;
        username: string;
        scope?: string;
    }
}

declare module 'next-auth' {
    interface User {
        idToken?: string;
        username?: string;
        accessToken?: string;
        profile?: any;
        scope?: string;
    }

    interface Profile {
        username: string;
    }

    interface Session {
        user: User;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "asgardeo",
            name: "Asgardeo",
            clientId: process.env.ASGARDEO_CLIENT_ID,
            clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
            issuer: process.env.ASGARDEO_ISSUER,
            userinfo: `https://api.asgardeo.io/t/${process.env.ASGARDEO_ORGANIZATION_NAME}/oauth2/userinfo`,
            type: "oauth",
            wellKnown: `https://api.asgardeo.io/t/${process.env.ASGARDEO_ORGANIZATION_NAME}/oauth2/token/.well-known/openid-configuration`,
            authorization: {
                params:
                    { scope: "openid profile create_bookings read_bookings" }
            },
            idToken: true,
            checks: ["pkce", "state"],
            profile(profile) {                
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                }
            },
        },
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, profile, user })  {
            if (account) {
                token.idToken = account.id_token!
                token.scope = account.scope!
            }

            if (profile) {
                token.username = profile.username           
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.idToken = token.idToken;
                session.user.username = token.username;
                session.user.scope = token.scope
            }

            return session;
        },
    },
    debug: true
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };