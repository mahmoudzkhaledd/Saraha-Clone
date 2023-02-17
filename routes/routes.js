const app = require('express').Router();

const auth = require('../services/register');
const checkAuth = require('../services/auth');
const goToMessagesPage = require('../services/Messages');
const {sendMessagePage, SendUserMessage} = require('../services/UserServices');


app.get('/',(req,res) => {
    res.redirect('/messages');
});

app.get('/messages',checkAuth.auth,goToMessagesPage);


app.get('/register',checkAuth.isLoggedin ,(req,res)=>{
    res.render('register');
});

app.get('/login',checkAuth.isLoggedin ,(req,res)=>{
    res.render('login');
});


app.get('/send-message/:id', sendMessagePage);


app.get('/not-found',(req,res)=>{
    res.render('NotFound');
});


app.post('/login', auth.login);

app.post('/logout', auth.logout);


app.post('/send-message/:id', SendUserMessage);


app.post('/register', auth.signup);

module.exports = app;