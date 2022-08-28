require('./config/config');
const express= require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const userModel = require("./src/model/UserModel")
const PORT = process.env.PORT || 8080;
const app = new express();
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
//app.use(express.static('./dist/frontend'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());



module.exports.sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to, // list of receivers
      subject: 'Hello ✔', // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};

app.post('/login', async (req,res)=> {
    console.log('reached');
    generateOTP = () => {
        const OTP = otpGenerator.generate(6);
        return OTP;
    };
    const userdata = new userModel({
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

app.post('/otp',(req,res)=>{
    var data = {
      email:req.body.email,
      otp:req.body.otp
  }
  user.findOne({email:data.email,otp:data.otp}).then((data)=>{
   if (data != null ){
    console.log("otp verify",data)
    res.send(data)
   }
   else{
  res.send(null)
   }
  })
});

app.listen(PORT,()=>{
    console.log(`Server up and running in ${PORT}`);
});