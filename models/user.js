const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    position: {type: String, required:true},
    organisation: {type: String, required:true},
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    enabled: {
      type: Boolean,
      default: true
    },
    title: String,
    isAdministrator: {type: Boolean, default: false},
    isEventOrganizer: {type: Boolean, default: false},
    isRewardProvider: {type: Boolean, default: false},
    program: {
      type: Schema.Types.ObjectId,
      ref: 'Program'
    }
  });
 
  //methods 

  //getUsingUsername
  userSchema.statics.getUsingUsername = function(
    username,
    callback
  ) {
    return this.findOne(
      { username: username }
    )
      .exec(callback);
  };
  
  //getUserbyId
  userSchema.statics.getUserById = function(id, callback) {
    return this.findOne({ _id: id })
      .populate("program")
      .exec(callback);
  };

  module.exports = mongoose.model('User', userSchema);