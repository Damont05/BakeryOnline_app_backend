import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema(
    {
        products:[
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }, 
                quantity: Number
            }
        ]
    },
    {timestamps:true}

);


cartSchema.plugin(paginate);


export const cartModel = mongoose.model(cartCollection, cartSchema)