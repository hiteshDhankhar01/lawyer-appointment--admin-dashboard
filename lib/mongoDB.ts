import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("mongoDB is already connected");
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL || "", { dbName: 'LawyerMeet' })
        isConnected = true;
        console.log("mongoDB is Connected")
    } catch (error) {
        console.log(error)
    }

}