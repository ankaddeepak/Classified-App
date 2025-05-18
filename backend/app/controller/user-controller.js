import User from '../models/user-model.js'
import { validationResult} from 'express-validator'
import bcryptjs from "bcryptjs"

const userCtlr = {}

// users register controller
userCtlr.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()})
    }
    const body = req.body
    // console.log(body)
    // console.log(body.password, body.password.length)
    try{
        const totalUser = await User.countDocuments()
        // console.log(totalUser)
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        // console.log(salt, salt.length)
        const hashPassword = await bcryptjs.hash(body.password, salt)
        // console.log(hashPassword, hashPassword.length)
        user.password = hashPassword
        // console.log(user.password, user.password.length)

        if(totalUser == 0) {
            user.role = 'admin'
        }

        if(totalUser > 0 && user.role == 'admin') {
            return res.status(400).json({ error: 'admin is already registered'})
        }

        if(totalUser > 0 && !user.role) {
            return res.status(400).json({ error: 'role is required'})
        }
        await user.save()
        return res.json(user)
    } catch(err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong'})
    }
}

// users login controller
userCtlr.login = async (req, res) => {
    // console.log(req.body)
    res.json(req.body)
}

// users update controller
userCtlr.update = async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
        const id = req.params.id;
        const body = req.body;
            try {
                const user = await User.findByIdAndUpdate(id, body, {new: true})
                if(!user) {
                    return res.status(404).json({errors: "id not found"})
                }
            } catch(err) {
                console.log(err)
                res.status(500).json({errors: "something went wrong"})
            }
    }

// users remove controller
userCtlr.remove = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id)
        if(!user) {
            return res.status(404).json({ errors: 'id not found'});
        }
        res.json({
            notice: `successfully removed ${user.name}`,
            user: user
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({ errors: 'something went wrong'});
    }
}

export default userCtlr