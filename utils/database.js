import mongoose from "mongoose";

let isConnected = false;    //track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("mongodb is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        isConnected = true;
        console.log("Mongodb Connected");

    } catch (error) {
        console.log(error);
    }
}

