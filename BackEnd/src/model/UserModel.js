const mongoose = require('mongoose');  
mongoose.connect("mongodb+srv://Butterfly89:Q1e1K1s1n877GWOq@cluster0.h2snxtl.mongodb.net/?retryWrites=true&w=majority", (err) => {

    if (!err){
        console.log("connected to DB");
    }
    else {
        console.log("Error in connection to DB:" + JSON.stringify(err, undefined, 2));
    }
});

const Schema = mongoose.Schema;

const User = new Schema({  
    email: { type: String },  
    otp: { type: Number }  
});  

const users = mongoose.model('User',User);
module.exports = users;
