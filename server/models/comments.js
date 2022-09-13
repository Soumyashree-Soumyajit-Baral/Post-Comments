const mongoose = require('mongoose');

const cominfo = new mongoose.Schema({
    mailid:{type:String,required:true},
    publish:{type:String,required:true}
    
})

const userComment = mongoose.model('Cominfo', cominfo);
module.exports=userComment;