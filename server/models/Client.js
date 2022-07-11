const mongoose = require('mongoose');

//create a mongoose schema - not related to graphQL
const ClientSchema = new mongoose.Schema({
    name:{
        type: String,        
    },
    email:{
        type: String, 
        unique: true,      
    },
    phone:{
        type: String,        
        unique: true,
    },
});

module.exports = mongoose.model('Client', ClientSchema);