const jwt = require('jsonwebtoken');


async function isLoggedin(req,res,cb){
    const token = req.cookies.token;
    try{
        const user = jwt.verify(token,process.env.ACCESS_TOKEN);
        return res.redirect('/messages');
    }catch(e){
        cb();
    }
}



async function auth(req,res,cb) {
    const token = req.cookies.token;
    try{
        const user = jwt.verify(token,process.env.ACCESS_TOKEN);
        req.user = user;
        res.locals.id = user.id;
        cb();
    }catch(e){
        res.clearCookie("token");
        return res.redirect('/login');
    }
}

module.exports = {
    auth,
    isLoggedin
};