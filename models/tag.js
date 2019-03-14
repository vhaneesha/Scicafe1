const mongoose = require('mongoose');

let tsgSchema = new mongoose.Schema({
    name: {type: String, required: true},
});
module.exports = mongoose.model('Tag', tagSchema);