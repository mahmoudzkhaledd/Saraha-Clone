const jwt = require('jsonwebtoken');
const User = require('../model/User');


module.exports = async (req,res)=>{
    const{id} = res.locals;
    const user = await User.findById(id);
    res.render('main',{user});
}