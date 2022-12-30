const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Error('Authentication Invalid');
    }
    const token = authHeader.split(' ')[1];
    
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //attach the user to the job route
        console.log(payload);
        req.user = {userId: payload.userId, name: payload.name};
        next();
    } catch (e) {
        res.status(401).json({msg: e});
    }

}

module.exports = auth;