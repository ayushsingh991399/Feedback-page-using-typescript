import { Message } from "@/Models/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAccesptingMessage?: boolean;
    messages?:Array<Message>;
}