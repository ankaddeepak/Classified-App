import express from 'express'
import {checkSchema} from 'express-validator'
import configureDB from './config/db.js'

import userCtlr from './app/controller/user-controller.js'
import categoriesCtlr from './app/controller/category-controller.js'
import productCtlr from './app/controller/product-controller.js'

import { userLoginValidationSchema, userRegisterValidationSchema } from './app/validator/user-validation.js'
import { categoryValidationSchema } from './app/validator/category-validation.js'
import { idValidationSchema } from './app/validator/id-validationSchema.js'
import { productValidationSchema } from './app/validator/product-validation.js'

const app = express()
const port = 3003

app.use(express.json())
configureDB()

// users routes
app.post('/register',checkSchema(userRegisterValidationSchema), userCtlr.register)
app.post('/login', checkSchema(userLoginValidationSchema), userCtlr.login)
app.put('/update-user/:id', checkSchema(idValidationSchema), checkSchema(idValidationSchema), userCtlr.update)
app.delete('/remove-user/:id', checkSchema(idValidationSchema), checkSchema(idValidationSchema), userCtlr.remove)

// categories
app.get("/all-categories", categoriesCtlr.list)
app.post("/create-category", checkSchema(categoryValidationSchema), categoriesCtlr.create)
app.put('/update-category/:id',checkSchema(categoryValidationSchema), checkSchema(idValidationSchema) , categoriesCtlr.update)
app.delete('/remove-category/:id', checkSchema(idValidationSchema), categoriesCtlr.remove)

// products
app.get("/all-products", productCtlr.list)
app.post("/create-product", productCtlr.create)
app.put("/update-product/:id", checkSchema(productValidationSchema), checkSchema(idValidationSchema), productCtlr.update)
app.delete("/remove-product/:id",checkSchema(productValidationSchema), checkSchema(idValidationSchema), productCtlr.remove)

app.listen(port, () => {
    console.log('server is running on port ' + port)
})