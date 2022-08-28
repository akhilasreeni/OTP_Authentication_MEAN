require('./config/config');
const express= require('express');
const cors = require('cors');
const userlist = require("./src/model/UserModel")
const PORT = process.env.PORT || 8080;
const app = new express();
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
//app.use(express.static('./dist/frontend'));
app.use(express.urlencoded({extended:true}));
app.use(cors());

generateOTP = () => {
  const OTP = otpGenerator.generate(6);
  return OTP;
};
app.post('/login', (req,res)=> {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Method:GET,POST,PUT,DELETE")
    console.log('reached');
    const userdata = new userlist({
            email : req.body.email,
            otp : this.generateOTP()
    })
    const user= new userdata.save();
    res.status(201);
    console.log('user added')
    var mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'diwaliwishes.2022@gmail.com',
            pass: 'qavgggxdriwfrzve'
        }
    });
    let mailDetails = {
        from: 'diwaliwishes.2022@gmail.com',
        to: user.email,
        subject: 'OTP Verification',
        html: `
      <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${user.otp}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>`
    }; 
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });

})

app.post('/verifyotp',(req,res)=>{
    var data = {
      email:req.body.email,
      otp:req.body.otp
  }
  userlist.findOne({email:data.email}).then((data)=>{
   if (data != null ){
    res.send(true)
   }
  })
});

app.listen(PORT,()=>{
    console.log(`Server up and running in ${PORT}`);
});