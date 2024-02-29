import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const cartCollection  = 'cart'

// const cartSchema = new mongoose.Schema({
// 	products: [
// 		{
// 			product: {
// 				type: mongoose.Schema.Types.ObjectId,
// 				ref: 'products',            
// 			},
// 			// user: {
// 			// 	type: mongoose.Schema.Types.ObjectId,
// 			// 	ref: 'users',
// 			// },
// 			quantity: {
// 				type: Number,
// 			}
// 		},
// 	]
// }, {timestamps: true })

const productInCartSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
	id: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    products: [productInCartSchema]
});


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

cartSchema.plugin(paginate);


export const cartModel = mongoose.model(cartCollection,cartSchema)