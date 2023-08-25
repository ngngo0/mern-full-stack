const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next ) =>{
    //verify auth
    const { authorization } =  req.headers

    //check if authorization was sent in the header
    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }
    //authorization looks like 'Bearer token'
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth