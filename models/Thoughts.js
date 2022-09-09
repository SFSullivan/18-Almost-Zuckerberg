const { Schema, model, SchemaTypes } = require('mongoose');

const thoughtSchema = new Schema({
    thought_text: {
    type: String,
    required: true,
    min: 1,
    max: 280,
    trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (dateVal) => moment(dateVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: [{
        type: String,
        required: true
    }],
    reactions: [{
        type: SchemaTypes.ObjectId,
        ref: 'Reactions'
    }]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    }
});

thoughtSchema.virtual('reaction_count').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Reactions', thoughtSchema);
module.exports = Thoughts;