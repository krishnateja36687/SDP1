const router = require('express').Router();
const passport = require('passport');
const authController=require('../controllers/authController')
const url=require("../config/conf-url")
const keys =require('../config/keys');

const authCheck = (req,res,next)=>{
  if(!req.user){
    res.send(req.user);
  }else{
    next();
  }
}

// auth login page
router.get('/login',authCheck,(req,res)=>{
  var nodemailer = require('nodemailer');

                    var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'travellingloverztourism33@gmail.com',
                        pass: 'panapakammohith2002'
                    }
                    });

                    var mailOptions = {
                    from: 'travelloverz <travellingloverztourism33@gmail.com>',
                    to: req.user.email,
                    subject: 'Welcome to TravellingLoverz',
                    html: `
                    <strong>Welcome to the travelloverz Family.</strong> You've been logged in!
                    
                    <p>You are now officially in the loop to hear all about our new updates, releases, offers and much more.</p>
                        
                        
                    <p>Contact us for further queries at: travellingloverz33@gmail.com or +91 8688036687</p>
                        
                    <p>Mail us at: travellingloverztourism33@gmail.com</p>`
                    };
    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                    });
  res.send(req.user)
  console.log(req.user.email)
})

// auth logout
router.get('/logout',(req,res)=>{
    req.logOut();
    res.send({key:'logedout'})     
});

// auth with password
router.post('/password', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.send(req.user);
  });

// auth with google
router.get('/google',passport.authenticate('google',{
    scope:['openid','profile','email']
})); 

// callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    return res.redirect(url.host.client+"/tours");
    // return res.redirect(keys.AppUri);
})

module.exports = router;