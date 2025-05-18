import User from '../models/user-model.js'

export const userRegisterValidationSchema = {
    
    // validation for name
    name: {
        in: ['body'],
        exists: {
            errorMessage: 'name field should be present'
        },
        notEmpty: {
            errorMessage: 'name field cannot be empty'
        },
        trim: true
    },

    // validation for email
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email field should be present'
        },
        notEmpty: {
            errorMessage: 'email field cannot be empty'
        },
        trim: true,
        normalizeEmail: true,

        custom: {
            options: async function (value) {
                try {
                    const user = await User.findOne({ email: value})
                    if(user) {
                        throw new Error('email is already taken')
                    }
                } catch(err) {
                    throw new Error(err.message)   
                }
                return true 
            }
        }
    },

    // validtion for password
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'password field should be present'
        },
        notEmpty: {
            errorMessage: 'password field cannot be empty'
        },
        trim: true,
        isStrongPassword: {
            options: {
                minLength: 8,
                minUpperCase: 1,
                minLowerCase: 1,
                minSymbol: 1,
                minNumber: 1
            },
            errorMessage: 'password must contain length of 8 characters, min one uppercase, min one lowercase, min one symbol and min one number'
        }
    }
}

export const userLoginValidationSchema = {
    email: {
        in: ['body'],
        exists: {
            errorMessage: "email field should be present"
        },
        notEmpty: {
            errorMessage: "email cannot be empty"
        },
        trim: true,
        normalizeEmail: true
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'password field should be existed'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minUpperCase: 1,
                minLowerCase: 1,
                minNumber: 3,
                minSymbol: 1,
                errorMessage: 'password must contain minimum of eight characters, one uppercase, one lowercase, three numbers and one symbol'
            }
        },
        trim: true
    }
}