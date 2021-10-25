let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Contact = require('../models/business_contact');

let businessContactController = require('../controller/businesscontact');

// display contact list page
router.get('/', businessContactController.displayContactList);

// get route to create contact
router.get('/add', businessContactController.displayAddPage);

// post route to create contact
router.post('/add', businessContactController.processAddPage);

// get route to edit contact
router.get('/edit/:id', businessContactController.displayEditPage);

// post route to edit contact
router.post('/edit/:id',  businessContactController.processEditPage);

//delete route to remove contact
router.get('/delete/:id',  businessContactController.processDeleteRequest);


module.exports = router;