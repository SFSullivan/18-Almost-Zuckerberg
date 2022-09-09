const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: SchemaTypes.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: SchemaTypes.ObjectId,
        ref: 'Friends'
    }]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    }
});

userSchema.virtual('friend_count').get(function () {
    return this.friends.length;
});

const Users = model('Users', userSchema);
module.exports = Users;