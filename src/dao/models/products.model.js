import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"

const productsCollection  = 'products'

const productsSchema = new mongoose.Schema(
    {   
        code:           { type:String, require:true, unique:true },
        title:          { type:String, require:true },
        description:    { type:String, require:false },
        price:          { type:Number, require:true },
        status:         { type:Boolean,require:false },
        stock:          { type:Number, require:true },
        category:       { type:String, require:true },
        thumbnail:      { type:String, require:true },
        id: {
            type: Number,
            required: false,
            unique: true
        },
    }, 
    {
        timestamps:true,strict:false
    }
)

productsSchema.plugin(paginate);

export const productsModel = mongoose.model(productsCollection,productsSchema)


