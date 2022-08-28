require('./config/config');
const express= require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const userModel = require("./src/model/UserModel")
const PORT = process.env.PORT || 8080;

const app = new express();
//app.use(express.static('./dist/frontend'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.post('/login', async (req,res)=> {
    console.log('reached');
    const userdata = new userModel({
            email : req.body.email
    })
    const user= await userdata.save();
    res.status(201);
    console.log('registration successfull')
})

app.listen(PORT,()=>{
    console.log(`Server up and running in ${PORT}`);
});
