const express = require('express');
const router = express.Router();
const models = require('../models')

const Post = models.Post

router.use((req, res, next) => {
    //do logging
    console.log("A request came in...")
    next();
});

router.get("/testAPI", (req,res) => {
    const resObject = {
        message: "Test API is working",
        user: req.user
    }
    res.send(resObject)
});

//get all
router.get('/posts', function(req,res) {
    Post.find({})
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


//post one
router.post('/posts', function(req,res){
    if (!req.body.content){
        res.status(400)
        res.json({success: false, error: "Missing content"})
    }
    const post = new Post({
        content: req.body.content,
        author: req.user._id,
    });
    post.save()
        .then(function(posts){
            res.json(posts)
            res.status(201)
        })  
        .catch(function(err){
            console.log(err)
            res.status(500)
            res.json({message: "Error.Catch", error: err})
        })
})

//get one
router.get("/posts/:postId", (req,res) => {
    Post.findOne({ _id: req.params.postId})
        .populate('author', 'email')
        .then(function(post){
            if(post) {
                res.json(post)
            }else{
                res.status(404)
                res.json({error: "Post doesn't exist!"})
            }
        })
        .catch(function(err){
            console.log(err)
            res.status(500)
            res.json({message: "Error", error: err})
        })
})

//patch one
router.patch('/posts/:postId', function(req,res) {
    Post.findOne({ _id: req.params.postId})
        .then(function(post){
            if(post) {
                if(req.user.isADMIN || post.author._id.equals(req.user._id)){
                    Post.updateOne(
                        {_id: req.params.postId}, 
                        { $set: {content: req.body.content}},
                        )
                        .then(function(post){
                            res.json(post)
                            res.status(200)
                        })   
                }else{
                    console.log("No")
                    res.status(403)
                    res.json({error: "You have no right to update"})
                }
                
            }else{
                res.status(404)
                res.json({error: "Post doesn't exist!"})
            }
        })
        .catch(function(err){
            console.log(err)
            res.status(500)
            res.json({message: "Error.Catch", error: err})
        })
})


//delete one
router.delete('/posts/:postId', (req,res) => {
    Post.findOne({ _id: req.params.postId})
    
    .then(function(post){
        console.log(post.author._id)
        console.log(req.user._id)
        console.log(req.user.role)
        if(post) {
            if(req.user.isADMIN || post.author._id.equals(req.user._id)){
                Post.deleteOne({ _id: req.params.postId})
                    .then(function(post){
                        res.json(post)
                        console.log("yes")
                        res.status(200)
                    })   
            }else{
                console.log("No")
                res.status(403)
                res.json({error: "You have no right to delete"})
            }
            
        }else{
            res.status(404)
            res.json({error: "Post doesn't exist!"})
        }
    })
    .catch(function(err){
        console.log(err)
        res.status(500)
        res.json({message: "Error.Catch", error: err})
    })
})


module.exports = router;