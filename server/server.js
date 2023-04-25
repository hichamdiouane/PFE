const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const bodyParser = require('body-parser')
const jwt_secret="jhwduhwque28012382903809218092{}/.,;'lgdyuew72838738edhuiwsn`1`109-0129307"

// controllers
const {ReadCar, CreateCar, DeleteCar, UpdateCar, FindCarByMatricule} = require('./controllers/Cars')
const {ReadTrip, CreateTrip, DeleteTrip, UpdateTrip} = require('./controllers/Trips')
const {ReadEsence,ReadGazoil} = require('./controllers/Fuels')
//---------------------------------------------------------------------------------------

// server
const app = express()
const port   = 7777
app.use(cors())
app.use(express.json())
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//---------------------------------------------------------------------------------------

// connection
const url = "mongodb+srv://pfe:HaRgkTjgWPCYZKGk@cluster0.asfexvl.mongodb.net/pfe"
mongoose.connect(url)
    .then(() => console.log("Connected"))
    .catch(err => console.log(err) )

app.listen(port, () => console.log(`Server is starting at port:${port}`))
//---------------------------------------------------------------------------------------

// routing
// Car
app.get('/cars',ReadCar)
app.post('/createCar',CreateCar)
app.delete('/deleteCar/:matricule',DeleteCar)
app.post('/updateCar',UpdateCar)
app.post('/getCarByMatricule',FindCarByMatricule)
//---------------------------------------------------------------------------------------

// Trip
app.get('/trips',ReadTrip)
app.post('/createTrip',CreateTrip)
app.delete('/deleteTrip/:matricule',DeleteTrip)
app.post('/updateTrip',UpdateTrip)
//---------------------------------------------------------------------------------------

// Fuel
app.get('/esence',ReadEsence)
app.get('/gazoil',ReadGazoil)
//---------------------------------------------------------------------------------------


// Login 
const UserModel = require('./models/Users')

app.post('/createuser',async (req,res)=>{
  const olduser=await UserModel.find({email:req.body.email})
  //console.log(olduser);
  if(!olduser.length){
  const user2=new UserModel(req.body);
  await user2.save();
   return res.json({ status:"ok",data:req.body});}
  else{
      console.log("user existed");
     return res.json({status:"error",msg:'user existed'})
  }

})
app.post('/signin',async (req,res)=>{
  //const [email,password]=req.body;
  const user= await UserModel.findOne({email:req.body.email});
   if(user){if(user.password==req.body.password) { const token=jwt.sign({email:req.body.email},jwt_secret); 
  return res.json({status:"ok",data:token,role:user.role})
  }}
  return res.json({status:"error"});
})

app.post('/getuser',async (req,res)=>{
  const token=req.body.token
  const user=jwt.verify(token,jwt_secret)
  UserModel.findOne({email:user.email}).then(data=>{res.json(data)}).catch(err=>{console.log(err)})
})

app.post('/reset',async (req,res)=>{
  const user=await UserModel.findOne({email:req.body.email})
  if(!user){
   console.log("user not found");
   res.json({status:"error"});
  }
  else{
      const secret=jwt_secret+user.password;
      const token=jwt.sign({email:user.email,id:user._id},secret,{expiresIn:'5m'});
      const link=`http://localhost:7777/reset/${user._id}/${token}`;
      console.log(link);
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'yasout69@gmail.com',
            pass: 'nxvyfbftqmsxybly'
          }
        });
        
        var mailOptions = {
          from: 'yasout69@gmail.com',
          to: user.email,
          subject: 'reset password attention:this expires in 10 min',
          text: link
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    res.json({status:"ok"})
  }
})

app.get("/reset/:id/:token",async(req,res)=>{
  //console.log(req.params.id);
  const token=req.params.token;
  const user=await UserModel.findOne({_id:req.params.id});
  if(!user){
       return res.send("not verified");
  }
  else{
  const secret=jwt_secret+user.password;
  try {
      const verify=jwt.verify(token,secret);
      res.render("index",{email:verify.email,status:"notverified"})
      
  } catch (error) {
      res.send("not verified");
  }}

})

app.post("/reset/:id/:token",async(req,res)=>{
  const password=req.body.password;
  const user=await UserModel.findOne({_id:req.params.id});
  if(!user){
      return res.send("not verified");
  }
  else{
  const secret=jwt_secret+user.password;
  try {
      const verify=jwt.verify(req.params.token,secret);
      await UserModel.updateOne({
          _id:req.params.id,
      },
      {
          $set:{
              password:password,
          }

      }
      ).catch(err=>{console.log(err)})
      //res.json({status:"password updated"});
      res.render("index",{email:verify.email,status:"ok"})
      
  } catch (error) {
      res.send("not verified");
  }}

})

app.post('/deleteuser',async(req,res)=>{
  const email=req.body.email;
  const user=await UserModel.findOne({email:email});
  if(user){
      await UserModel.deleteOne({email:email});
     return res.json({status:"ok"});
  }
  else{
      return res.json({status:"err"});
  }

  })
  app.post('/updateuser',async(req,res)=>{
      const user=await UserModel.findOne({email:req.body.email1})
      if(user){
          const newuser=await UserModel.updateOne({
              email:req.body.email1,
          },
          {
              $set:{
                  name:req.body.name,
                  email:req.body.email,
                  age:req.body.age,
                  role:req.body.role,
              }
  
          })
        return res.json({status:"ok",data:newuser});
      }
      else{
          return res.json({status:"err",msg:"not found"});
      }

  })
  app.post('/updateadmin',async(req,res)=>{
      console.log(req.body.name);
      console.log(req.body.email);
      console.log(req.body.phone);
      console.log(req.body.country);
      console.log(req.body.city);
      const user=await UserModel.findOne({email:req.body.email})
      if(user){
          console.log(user);
          const newuser=await UserModel.updateOne({
              email:req.body.email,
          },
          {
              $set:{
                  name:req.body.name,
                  phone:req.body.phone,
                  country:req.body.country,
                  city:req.body.city,
              }
  
          })
          console.log(newuser);
        return res.json({status:"ok",data:newuser});
      }
      else{
          return res.json({status:"err",msg:"not found"});
      }
  })
//---------------------------------------------------------------------------------------