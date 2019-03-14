const mongoose = require('mongoose');

let rewardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required:true},
    organisation: {type: String, required:true},
    submitter: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
     },
    rewardstart:Date,
    rewardend: Date,
    mineventsattended: {type: Number, default: 1}
});

module.exports = mongoose.model('Reward', rewardSchema);