const mongoose = require('mongoose');

const userdata = new mongoose.Schema({
    mailid:{type:String,required:true},
    password:{type:String,required:true}
})

const user = mongoose.model('userdata', userdata);
module.exports=user;