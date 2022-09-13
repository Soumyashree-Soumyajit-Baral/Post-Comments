const mongoose = require('mongoose');

const pubinfo = new mongoose.Schema({
    mailid:{type:String,required:true},
    publish:{type:String,required:true}
    
})

const userPublish = mongoose.model('Pubinfo', pubinfo);
module.exports=userPublish;