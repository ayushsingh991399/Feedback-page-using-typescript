import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Models/User";
import { Message } from "@/Models/User";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }
    if (!user.isAcceptingMessage) {
      return Response.json(
        { success: false, message: "User is not accepting messages" },
        { status: 403 },
      );
    }
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json({
      success: true,
      message: "Message posted successfully",
    });
  } catch (error) {
    console.log("Error posting message:", error);

    return Response.json(
        { success: false, message: "Error posting message" },
        { status: 500 },
      );
    
  }
}
