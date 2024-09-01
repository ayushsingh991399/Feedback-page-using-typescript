import NextAuth from "next-auth/next";
import { AuthOptions } from "./option";

const handler = NextAuth(AuthOptions)

export { handler as GET,handler as POST,handler as PUT,handler as DELETE}