const mongoose = require('mongoose');


let programSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    fullName: {type: String, required:true},
    description: {type: String}
    
});
module.exports = mongoose.model('Program', programSchema);