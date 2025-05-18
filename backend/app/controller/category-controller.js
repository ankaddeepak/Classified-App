import Category from "../models/category-model.js";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs"

const categoriesCtlr = {}

// category create controller
categoriesCtlr.create = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty) {
        return res.status(400).json({error: errors.array()})
    }
    const body = req.body
    try {
        const category = await Category.create(body)
        res.status(201).json(category)
    } catch(err) {
        console.log(err)
        res.status(500).json({errors: "something went wrong"})
    }
}

// category create controller
categoriesCtlr.list = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch(err) {
        console.log(err);
        res.status(500).json({errors: "something went wrong"})
    }
}

// category update controller
categoriesCtlr.update = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty) {
        return res.status(400).json({error: errors.array()})
    }
    const id = req.params.id
    const body = req.body
    try {
        const category = await Category.findByIdAndUpdate(id, body, {new: true})        
        if(!category) {
            return res.status(404).json({errors: "id not found"})
        }
        res.json(category)
    } catch(err) {
        console.log(err)
        res.status(500).json({errors: "something went wrong"})
    }
}

// category remove controller
categoriesCtlr.remove = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty) {
        res.status(400).json({error: errors.array()})
    }
    const id = req.params.id
        try {
            const category = await Category.findByIdAndDelete(id)
            if(!category) {
                res.status(404).json({errors: "id not found"})
            }
            res.json(category)
        } catch(err) {
            console.log(err)
            res.status(500).json({errors: "something went wrong"})
        }
}

export default categoriesCtlr