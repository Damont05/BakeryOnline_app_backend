import mongoose from "mongoose";

const userCollection  = 'users'
const usersSchema = new mongoose.Schema(
    {
        dni:        { type:String, unique:true, require:true, },
        name:       String,
        lastname:   String,
        age:        Number,
        phone:      String,
        email:      { type:String, require:true, unique:true },
        addres:     String,
        deleted: {
            type:Boolean, default:false
        }
    }, { timestamps:true}
)
export const usersModel = mongoose.model(userCollection,usersSchema)