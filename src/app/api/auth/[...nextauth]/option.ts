import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Models/User";


export const AuthOptions: NextAuthOptions = {
    providers: [
       CredentialsProvider ({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text", },
                password: { label: "password", type: "password"}
            }, 
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [{
                            email: credentials.identifier,

                        }, {
                            username: credentials.identifier,

                        },]
                    })
                    if (!user) {
                        throw new Error("User not found.")
                    }
                    if (!user.isVerified) {
                        throw new Error("User is not verified.")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorrect) {
                        return user
                    }else{
                        throw new Error("Invalid Password.")
                    }
                } catch (err: any) {
                    throw new Error(err)
                }
            }


            })
    ],
    callbacks:{
        async jwt({token, user}) {
            if(user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified;
                token.username = user.username;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
            
            return token
        },
        async session({session, token}) {
            session.user._id = token._id
            session.user.isAcceptingMessages = token.isAcceptingMessages
            session.user.isVerified = token.isVerified
            session.user.username = token.username

            return session
        
        },
    },
    pages:{
        signIn: '/sign-in',

    },
    session:{
        strategy: "jwt",
       
    },
    secret: process.env.NEXTAUTH_API_KEY
}