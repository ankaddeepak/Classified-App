import jwt from 'jsonwebtoken'

export default function authenticateUser(req, res, next) {
    const token = req.headers['authorization']
    if(!token) {
        return res.status(401).json({ errors: 'token is quired'})
    }
    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = tokenData.userId
        next()
    }catch(err) {
        console.log(err)
        return res.status(401).json({ errors: err.message})
    }
}