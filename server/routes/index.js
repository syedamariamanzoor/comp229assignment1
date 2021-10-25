let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let indexController = require('../controller/index');

//get route for home page
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

//get route for about page
router.get('/about', indexController.displayAboutPage);

//get route for projects page
router.get('/projects', indexController.displayProjectsPage);

//get route for services page
router.get('/services', indexController.displayServicesPage);

// get route for contact page
router.get('/contact', indexController.displayContactPage);

// get route to display login
router.get('/login', indexController.displayLoginPage);

// post route to process login
router.post('/login', indexController.processLoginPage);

// get route to display register page
router.get('/register', indexController.displayRegisterPage);

// post route to process register page
router.post('/register', indexController.processRegisterPage);

// get route to display register page
router.get('/logout', indexController.performLogout);



module.exports = router;
