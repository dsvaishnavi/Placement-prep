import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.URI)
        console.log("DataBase Connected Successfully : Be Responsible")

    }
    catch(error){
        console.error("The database connection Error is :", error)
    }
}

export default connectDB;