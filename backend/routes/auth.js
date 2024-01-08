
const express = require('express');
const User = require('../modles/User');
const router = express.Router();        // importing the router 
const {  validationResult, body } = require('express-validator');   // importing the express validator
const bcrypt = require('bcryptjs')    // importing bcryptjs for adding salt to or passsword
const jwt = require('jsonwebtoken');   // importing jwt for sending the token after the authorization
const fetchuser = require('../middleware/fetchuser')


JWT_SECRET ="itsurboybadA$$nigga"


// create a user using : POST "api/auth/" .no login  required
router.post('/createuser',[
    body('email','invalid email').isEmail(),
    body('name','please enter a name more than 5 letters').isLength({min: 5}),
    body('password','enter a password of minimum 5 letters').isLength({min:5})
] , async (req,res)=> {
    let success= false;
    // mtehod 1 : to save the content in the mongoDB database
    // console.log((req.body));
    // const cont = User(req.body);
    // cont.save()
    // res.send(req.body);


    // if there are errors return the error and bad request
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    
    try{
        
        
    // check wheteher user with this email exists for unique users
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "sorry email with already exists"})
    }

    // here the salting process takes place
    const salt =await bcrypt.genSalt(10);  
    const secPass= await bcrypt.hash(req.body.password,salt) ;

    // method 2: to store the data in the database
    user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : secPass
    });
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken= jwt.sign(data,JWT_SECRET);
   success=true
    res.json({success,authtoken})  // sending the token after authentication
        
        }catch(error) {
            console.log(error)
            res.status(500).send("some error has occured")
        }
    
    // .then(user => res.json(user))
    // .catch(error => {console.log(error )
    // res.json({error : 'please enter a unique value', message: error.message})})

} )


// loggong in a user : POST "api/auth/" .no login  required
router.post('/login',[
    body('email','invalid email').isEmail(),                 // this is for validation
    body('password','password must exists').exists()
] , async (req,res)=> {
    let success= false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {
            const { email, password } = req.body;
            let user = await User.findOne({email})
            if(!user){

                return res.status(400).json({success, error: 'please enter the right credentials'})
            }
            let ispassword = await bcrypt.compare(password,user.password)
            if(!ispassword){
                return res.status(400).json({success, error: 'please enter the right credentials'}) 
            }
            const data={
                user:{
                    id:user.id
                }
            }
            const authtoken= jwt.sign(data,JWT_SECRET)
            success=true;
            res.json({success,authtoken}) 

    } catch(error) {
        console.log(error)
        res.status(500).send("some error has occured")
    }
})

// getting data of the loggedin users : POST "api/auth/" .login required

router.post('/getuser', fetchuser, async (req,res)=> {
    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch(error) {
        console.log(error)
        res.status(500).send("some error has occured")
    }
})


module.exports = router