import mongoose from "mongoose";

const ticketCollection  = 'ticket'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => shortid.generate() // Devuelve directamente el código generado por shortid
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    },
    products: {
        // Define la estructura de los productos si es necesario
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
}, {
    strict: false
});

export const ticketModel = mongoose.model(ticketCollection,ticketSchema)