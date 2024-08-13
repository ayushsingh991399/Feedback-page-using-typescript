import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}
const Connection : ConnectionObject = {}
async function dbConnect():Promise<void>{
    if( Connection.isConnected){
        console.log("Database is already connected.");
        return;
    }
    try {
     const db =   await mongoose.connect(process.env.MONGODB_URL ||'' ,{})
       Connection.isConnected = db.connections[0].readyState

       console.log("Database connected successfully");

    } catch (err) {
        console.error("Failed to connect to the database", err);
        process.exit(1);
    }
    
}

export default dbConnect;