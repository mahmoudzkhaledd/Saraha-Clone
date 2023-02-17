const bcrypt = require('bcrypt')
const User = require('../model/User');
const jwt = require('jsonwebtoken');


async function signup(req,res){
    try{
        const {
            email,
            password,
            username,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password,salt);

        user = User({
            email,
            password:hashedPass,
            username,
        }); 

        user = await user.save();     
        const accessToken = jwt.sign({"id": user._id},process.env.ACCESS_TOKEN,{expiresIn:'1h'});
        res.cookie('token',accessToken,{
            httpOnly: true,
        });
        return res.status(200).redirect('/messages');
    } catch(err){
        return res.status(500).json({msg : err.message});
    }

}
async function login(req,res){
    const {
        email,
        password
    } = req.body;
    const findUser = await User.findOne({"email":email});

    if(findUser != null && findUser != undefined){
        if(await bcrypt.compare(password, findUser.password)){
           const accessToken = jwt.sign({"id": findUser._id},process.env.ACCESS_TOKEN,{expiresIn:'1h'});
           res.cookie('token',accessToken,{
                httpOnly: true,
           });
           return res.status(200).redirect('/messages');
        }else{
            return res.status(500).json({"Error":"Please ensure email or password"});
        }
    }


    return res.status(500).json({"Error":"Please ensure email or password"});
}


async function logout(req,res){
    res.clearCookie("token");
    return res.redirect('/login');
}

module.exports = {
    signup,
    login,
    logout,
}