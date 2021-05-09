const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const router = express.Router();

const models = require('../models')

const User = models.User

router.use((req, res, next) => {
    //do logging
    console.log("A update request came in...")
    next();
});

router.get("/testUpdate", (req,res) => {
    const resObject = {
        message: "Test update is working",
        user: req.user
    }
    res.send(resObject)
});

router.get('/', function(req,res) {
    User.find({})
        .then(function(posts){
            res.json(posts)
            res.status(200)
        })  
        .catch(function(err){
            console.log(err)
            res.status(500)
            res.json({message: "Error.Catch", error: err})
        })
});

router.patch('/:id', function(req,res){
    User.findOne({email: req.body.email}, function(err,user){
        if (err) throw err;
        if (!user) {
            res.status(400).send({success: false, message: "User not found"})
        }else{
            console.log(req.user._id)
            console.log(user._id)
            console.log(req.user.role)
            if(req.user.isADMIN || req.user._id.equals(user._id)){
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if(isMatch) {
                        if(! req.body.newPassword){
                            res.status(401).send({success: false, message: 'No newPassword'})
                        }else{
                            user.password = req.body.newPassword
                            if(req.body.lastName){
                                user.lastName = req.body.lastName
                            }
                            if(req.body.firstName){
                                user.firstName = req.body.firstName
                            }
                            if(req.body.nickName){
                                user.nickName = req.body.nickName
                            }
                            

                            user.save()
                            res.json({
                            success:true,
                            message: "Success"
                        })
                        res.status(200)
                        }
                        
                    }else{
                        res.status(401).send({success: false, message: 'Wrong Password'})
                        
                    }
                })
            }else{
                res.status(403)
                res.json({error: "You have no right to change the password and other infomation"})
            }
            
        }
    })
})
    
router.delete('/:id',function (req,res){
    User.findOne({ _id: req.params.id})
    .then(function(user){
        if(user){
            console.log(req.user._id)
            console.log(user._id)
            console.log(req.user.role)
            
            if(req.user.isADMIN || req.user._id.equals(user._id)){
                User.deleteOne({ _id: req.params.id})
                    .then(function(user){
                        res.json(user)
                        res.status(200)
                    })   
            }else{
                res.status(403)
                res.json({error: "You have no right to delete"})
            }
        }else{
            res.status(404)
            res.json({error: "User doesn't exist!"})
        }
    })
    .catch(function(err){
        console.log(err)
        res.status(500)
        res.json({message: "Error.Catch", error: err})
    })
})




module.exports = router;