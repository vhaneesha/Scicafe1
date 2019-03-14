const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    location: {type: String, required : true},
    starttime: Date,
    endtime: Date,
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
   submitter: {
       type:Schema.Types.ObjectId,
       ref: 'User'
    },
    isapproved: {type: Boolean, default: false},
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        
    }]
});

//methods

//getEventById
eventSchema.statics.getEventById = function(id, callback) {
    return this.findOne({ _id: id })
      .populate("attendees")
      .exec(callback);
  };
module.exports = mongoose.model('Event', eventSchema);