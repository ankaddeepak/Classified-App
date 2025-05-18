import mongoose from "mongoose"
const {Schema, model} = mongoose

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    // image: String,
    category: Schema.Types.ObjectId
}, {timeStamps: true})

const Product = model("Product", productSchema)
export default Product;