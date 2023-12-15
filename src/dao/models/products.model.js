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
        stock:          { type:Number, require:false },
        category:       { type:String, require:false },
        thumbnail:      { type:String, require:true },
    }, {timestamps:true}
)

productsSchema.plugin(paginate);

export const productsModel = mongoose.model(productsCollection,productsSchema)