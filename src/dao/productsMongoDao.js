import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";
import { logger } from "../utils/loggers.js";


try {
    await mongoose.connect(
        "mongodb+srv://user_coder:Coder123@cluster0.tcbhngn.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce"
    );
    logger.info("DB Online");
} catch (e) {
    logger.error(e)
}

export class productMongoDAO {

    static async getPaginate(query, limit, pag, sortOrder) {
        return await productsModel.paginate(
            query,
            {
                lean: true,
                limit: limit,
                page: pag,
                sort: sortOrder ? { price: sortOrder } : undefined,
            }
        );
    }

    static async get() {
        return productsModel.findOne().lean();
    }

    static async getProduct(id) {
        return productsModel.findOne(id)
            .sort({ id: -1 })
            .limit(1)
            .lean();
    }

    static async create(id) {
        const newProduct = new productsModel(id);

        return await newProduct.save();

    }

    static async update(id, updatedFields) {
        return productsModel.updateOne(
            { id: id },
            { $set: updatedFields })
    }

    static async delete(id) {
        return productsModel.deleteOne({ id: id });
    }
}
