import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { updateSession, updateToken, userLogin } from "@/redux/api/authApi";
import { APP_ROUTES } from "@/routes";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials: any, _req) => {
        const response = await userLogin({
          email: credentials?.email,
          password: credentials.password,
        });

        console.log(response);

        if (response?.status === "failure" && !response?.data) {
          throw new Error(response?.message);
        }
        return {
          id: response?.data?.doctor?._id,
          name:
            response?.data?.doctor?.firstName +
            " " +
            response?.data?.doctor?.lastName,
          firstName: response?.data?.doctor?.firstName,
          lastName: response?.data?.doctor?.lastName,
          email: response?.data?.doctor?.email,
          mobileNumber: response?.data?.doctor?.mobileNumber,
          isEmailVerified: response?.data?.doctor?.isEmailVerified,
          gender: response?.data?.gender,
        };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = updateToken(token, user);
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session = updateSession(session, token);
      }
      return session;
    },
  },
  pages: {
    signIn: APP_ROUTES.LOGIN,
  },
};

export default authOptions;
