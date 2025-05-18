export const productValidationSchema = {
    name: {
        in: ['body'],
        exists: {
            errorMessage: "name should be existed"
        },
        notEmpty: {
            errorMessage: "name cannot be empty"
        },
        trim: true
    },
    price: {
        exists: {
            errorMessage: "price should be existed"
        },
        notEmpty: {
            errorMessage: "price cannot be empty"
        },
        trim :true
    },
    description: {
        exists: {
            errorMessage: "descritpion should be existed"
        },
        notEmpty: {
            errorMessage: "descritpion cannot be empty"
        },
        trim: true
    },
    category: {
        in: ['body'],
        exists: {
            errorMessage: "category should be existed"
        },
        notEmpty: {
            errorMessage: "category cannot be empty"
        },
        isMongoId: {
            errorMessage: "category should be a valid mongoDB id"
        }
    }
}