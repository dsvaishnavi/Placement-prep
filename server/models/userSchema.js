import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({

    name : {
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true,
    },
    emailverified : {

        type : Boolean,
        required : true
    }
})
const userModel = mongoose.model("usersData",userSchema)

export default userModel