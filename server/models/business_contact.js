let mongoose = require('mongoose');

let contactModel = mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: String,
    email: String,
},
{
    collection: "contacts"
});

module.exports = mongoose.model('BusinessContact', contactModel);