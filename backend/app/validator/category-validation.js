// import Category from "../models/category-model.js"

export const categoryValidationSchema = {
    name: {
        in: ['body'],
        exists: {
            errorMessage: 'Category name fild is required'
        },
        notEmpty: {
            errorMessage: 'category field cannot be empty'
        },
        trim: true,
        // custom: {
        //     options: async function(value) {
        //             const category = await Category.findOne({ name: {$regex: value, $options: 'i'} })
        //             if(!category) {
        //                 return true
        //             }
        //             throw new Error(err.message)
        //     }
        // }
    }
}