require('dotenv').config();
const PORT = process.env.PORT || 6000;
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use(routes);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{ 
    app.listen(PORT,()=>console.log(`Connected to port ${PORT}`));
}).catch(e=>console.log(e));     