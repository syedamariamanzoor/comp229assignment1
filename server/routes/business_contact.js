let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let businessContactController = require('../controller/businesscontact');



// helper function to ensure auth
function requireAuth(req, res, next)
{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();

}



// display contact list page
router.get('/', requireAuth, businessContactController.displayContactList);

// get route to create contact
router.get('/add', requireAuth, businessContactController.displayAddPage);

// post route to create contact
router.post('/add', requireAuth, businessContactController.processAddPage);

// get route to edit contact
router.get('/edit/:id', requireAuth, businessContactController.displayEditPage);

// post route to edit contact
router.post('/edit/:id', requireAuth, businessContactController.processEditPage);

//delete route to remove contact
router.get('/delete/:id', requireAuth, businessContactController.processDeleteRequest);


module.exports = router;