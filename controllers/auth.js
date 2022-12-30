const User = require('../models/User');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const user = await User.create(req.body);
    const token = user.createJWT();
    // const token = jwt.sign({userId: user._id, name: user.name}, 'jwtsecret', {expiresIn: '30d'});
    res.status(201).json({ token });
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password)
        throw new Error('Please provide email and password');

    const user = await User.findOne({email});
    if(!user)
        throw new Error('Invalid Credentials');

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        res.status(401).json({msg: 'Invalid Credentials'});
        return
    }

    const token = user.createJWT();
    res.status(200).json({user: {name:user.name}, token})
}

module.exports = {
    register, login
}