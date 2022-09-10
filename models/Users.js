const { mongoose, SchemaTypes } = require('mongoose');
const { thoughtSchema } = require('./Thoughts');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    thoughts: [{
        type: SchemaTypes.ObjectId, 
        ref: 'thought'
    }],
    friends: []
})

const User = mongoose.model('User', userSchema);

module.exports = User;