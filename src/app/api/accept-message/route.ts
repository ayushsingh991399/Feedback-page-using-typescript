import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Models/User";
import {User} from "next-auth"
import { AuthOptions } from "../auth/[...nextauth]/option";


export async function POST(request: Request){
    await dbConnect();
    const session = await getServerSession(AuthOptions)
    const user:User = session?.user
    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "User not authenticated",
        },{
            status: 401,
        })
    }
    const userId = user._id 
    const { acceptMessages } = await request.json()
    try {
        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage:acceptMessages },
            { new: true }
        )
        if(!updateUser){
            return Response.json({
                success: false,
                message: "Failed to update user status to accept messages",
            },
            { status: 404 },)
        }
        return Response.json({
            success: true,
            message: "Message acceptance status updated successfully",
            updateUser
        },
        { status: 200 },)
    } catch (error) {
        console.error("failed to update user status to accept messages", error);
        return Response.json(
            {
                success: false,
                message: "failed to update user status to accept messages",
            },
            { status: 500 },
        );
        
    }
}

export async function GET(request:Request){
    await dbConnect();
    const session = await getServerSession(AuthOptions)
    const user:User = session?.user
    if(!session ||!session.user){
        return Response.json({
            success: false,
            message: "User not authenticated",
        },{
            status: 401,
        })
    }
    const userId = user._id 
    try {
        const founduser = await UserModel.findById(userId)
        if(!founduser){
            return Response.json({
                success: false,
                message: "User not found",
            },
            { status: 404 },)
        }
        return Response.json({
            success: true,
            isAcceptingMessage: founduser.isAcceptingMessage,
            user
        },
        { status: 200 },)
    } catch (error) {
        console.error("failed to fetch user details", error);
        return Response.json({
                success: false,
                message: "failed"
                },{
                    status: 500 
                },)
            
                
            }      
}