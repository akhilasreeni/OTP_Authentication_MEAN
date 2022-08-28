const mongoose = require('mongoose');  
mongoose.connect(process.env.MONGODB_URI, (err) => {

    if (!err){
        console.log("connected to DB");
    }
    else {
        console.log("Error in connection to DB:" + JSON.stringify(err, undefined, 2));
    }
});

const Schema = mongoose.Schema;

const User = new Schema({  
    email: { type: String, required: true, unique: true },  
    otp: { type: Number, required: true }  
});  

const userlist = mongoose.model('User',User);
module.exports = userlist;
