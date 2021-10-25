let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    firstname : String, 
    lastname : String,
    username : String, 
    /*password : String, */
    email : String
},
{
    collection: "users"
});


let options =({missingPassword: 'Missing / wrong password '});
User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);