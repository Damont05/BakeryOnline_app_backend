import mongoose from "mongoose";

const userCollection  = 'users'
const usersSchema = new mongoose.Schema(
    {
        first_name: String,
        last_name:  String,
        email:      { type:String, require:true, unique:true },
        age:        Number,
        password:   String,
        cartID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cart'
        }, 
        role: {
            type:String, 
            default:'user'
        },
        deleted: {
            type:Boolean, default:false
        }
    }, { timestamps:true, strict:false}
)
export const usersModel = mongoose.model(userCollection,usersSchema)