import mongoose from "mongoose";

const userCollection  = 'users'
const usersSchema = new mongoose.Schema(
    {
        
        name:      String,
        email:      { type:String, require:true, unique:true },
        password:   String,
        deleted: {
            type:Boolean, default:false
        }
    }, { timestamps:true, strict:false}
)
export const usersModel = mongoose.model(userCollection,usersSchema)