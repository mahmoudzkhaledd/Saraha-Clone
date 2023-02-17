const user = require('../model/User');
var ObjectId = require('mongoose').Types.ObjectId;

async function sendMessagePage(req,res) {
    const id = req.params.id;

    if(id != null && id != undefined && ObjectId.isValid(id)){
        const findUser = await user.findById(id);

        if(findUser != null) res.render('SendUserMessage',{user:findUser});
        else res.redirect('/not-found');

    } else res.redirect('/not-found');

  
}


async function SendUserMessage(req,res) {
    try{
        if(req.params.id != undefined) {
            const findUser = await user.findById(req.params.id);
            findUser.messages.push(req.body.message);
            await findUser.save();
            res.redirect(req.get('referer'));
        }
    }catch(e){
        res.sendStatus(500);
    }
}
module.exports = {
    sendMessagePage,
    SendUserMessage,
};