const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('passport');
require('dotenv/config'); 

//Import Routes
const routes = require('./routes')

require ('./config/passport')(passport)


mongoose.connect("mongodb://mongo:27017/acemdb", {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            const app = express()

            app.get('/',(req,res) => {
                    res.send('helloworld');
            });

            app.use(bodyParser.urlencoded({extended: true}));
            app.use(bodyParser.json());
            app.use(cors());
            app.use('/api/auth', routes.auth);
            app.use('/api/update',passport.authenticate('jwt', { session : false }), routes.update)
            app.use('/api', passport.authenticate('jwt', { session : false }), routes.posts)
            

            app.listen(3000, () => {
                console.log("Server has started")
            })
        })
        .catch(err => {
            console.error("Mongo Connection Error", err);
            process.exit();
        })
         


