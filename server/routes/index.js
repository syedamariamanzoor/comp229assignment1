let express = require('express');
let router = express.Router();

let indexController = require('../controller/index');

router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

router.get('/about', indexController.displayAboutPage);

router.get('/projects', indexController.displayProjectsPage);

router.get('/services', indexController.displayServicesPage);

router.get('/contact', indexController.displayContactPage);

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login' });
});


module.exports = router;
