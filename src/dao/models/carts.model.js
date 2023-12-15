import mongoose from "mongoose";

const cartCollection  = 'cart'

const cartSchema = new mongoose.Schema({
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'products',            
			},
			quantity: {
				type: Number,
			}
		},
	]
}, {timestamps: true })

// Methods populate
cartSchema.pre("findOne", function(){
	this.populate({
		path:'products.product',
	})
});
 
cartSchema.pre("find", function(){
	this.populate({
		path:'products.product',
	})
	this.lean()
});

export const cartModel = mongoose.model(cartCollection,cartSchema)