const mongoose = require('mongoose');
const { IPL_TEAMS } = require('../config/constants');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  team: {
    name: { 
      type: String, 
      enum: IPL_TEAMS.map(team => team.name),
      required: true
    },
    logo: { 
      type: String 
    },
    primaryColor: { 
      type: String 
    },
    secondaryColor: { 
      type: String 
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);