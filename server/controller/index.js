let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About' });
}


module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact' });
}



module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services' });
}


module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects' });
}




// display login page
module.exports.displayLoginPage = (req, res, next)=>{
    if(!req.user){
        res.render('auth/login', {title: 'Login', messages: req.flash('loginMessage')});
    }else{
        res.redirect('/');
    }
    
}

// process login page
module.exports.processLoginPage = (req, res, next)=>{

    passport.authenticate('local', (err,user,info) => {
        //server error
        if(err){
            return next(err);
        }
        
        if(!user){
            req.flash('loginMessage', "Authentication error");
            res.redirect('/login');
        }
        req.login(user, (err) => {
            if(err){
                return next(err);
            }

            return res.redirect('/businesscontact');
        })
    })(req, res, next);
}


// display register page
module.exports.displayRegisterPage = (req, res, next)=>{
    if(!req.user){
        res.render('auth/register', {title: 'Register', messages: req.flash('registerMessage')});
    }else{
        res.redirect('/');
    }
    
}

// process register page
module.exports.processRegisterPage = (req, res, next)=>{


    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        /*password: req.body.password,*/
        username: req.body.username
    });

    User.register(newUser, req.body.password, (err)=>{

        if(err){
            console.log('Error inserting new user...');
            if(err.name=='UserExistsError'){
                req.flash('registerMessage','User already exist..');
                console.log('Error: User already exist.')
            }

            return res.render('auth/register', {title: 'Register', messages: 'Register message'});
        }
        else{
            // if no error user is succefully registered
            // show the contacct list
            
            return passport.authenticate('local')(req,res, () => {
                res.redirect('/businesscontact');

            });

        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');

}