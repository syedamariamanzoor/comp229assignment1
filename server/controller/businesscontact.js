let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let Contact = require('../models/business_contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err){
            return console.error(err);
        }else{
           //console.log(contactList);
           res.render('businesscontact/list', {title: 'Contact List', BusinessContact: contactList});
        }
    });
}

// display add page
module.exports.displayAddPage = (req, res, next)=>{
    res.render('businesscontact/add', {title: 'Add Contact'});
}

// process add page
module.exports.processAddPage = (req, res, next)=>{
    let newContact = Contact({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "phone":req.body.phone,
        "email":req.body.email
    });

    Contact.create(newContact, (err, Contact)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/businesscontact');
        }

    });

}


module.exports.displayEditPage = (req, res, next)=>{
    let id = req.params.id;
    Contact.findById(id, (err, contactToEdit)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.render('businesscontact/edit', {title:'Edit Contact', contact: contactToEdit});
        }
    });
}

// process add page
module.exports.processEditPage = (req, res, next)=>{
    let id = req.params.id;

    let updatedContact = Contact({
        "_id":id,
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "phone":req.body.phone,
        "email":req.body.email
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/businesscontact');
        }
    });
}


module.exports.processDeleteRequest = (req, res, next)=>{
    let id = req.params.id;
    Contact.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/businesscontact');
        }
    });

}








