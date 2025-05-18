import Product from "../models/product-model.js";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

const productCtlr = {}

// product create controller
productCtlr.create = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty) {
        res.status(400).json({error: errors.array()})
    }
    const body = req.body
        try {
            const product = await Product.create(body, {new: true})
            res.json(201).json(product)
        } catch(err) {
            console.log(err)
            res.status(500).json({errors: "something went wrong"})
        }
}

// product list controller
productCtlr.list = async (req, res) => {
    try {
        const product = await Product.find()
        res.json(product)
    } catch(err) {
        console.log(err)
        res.status(500).json({errors: "something went wrong"})
    }
}

// product update controller
productCtlr.update = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty) {
        res.status(400).json({error: errors.array()})
    }
    const id = req.params.id
    const body = req.body
        try {
            const product = await Product.findByIdAndUpdate(id, body, {new: true})
            if(!product) {
                res.status(404).json({errors: "id not found"})
            }
            res.json(product)
        } catch(err) {
            console.log(err)
            res.status(500).json({errors: "something went wrong"})
        }
}

// product delete controller
productCtlr.remove = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty) {
        res.status(400).json({error: errors.array()})
    }
    const id = req.params.id
        try {
            const product = await Product.findByIdAndDelete(id, {new: true})
            if(!product) {
                res.status(404).json({errors: "id not found"})
            }
            res.json(product)
        } catch(err) {
            console.log(err)
            res.status(500).json({errors: "something went wrong"})
        }
}

export default productCtlr;