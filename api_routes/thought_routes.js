const thought_router = require('express').Router();
const { Thought } = require('../models');
const { User } = require('../models');

thought_router.get('/thoughts', async (req, res) => {
    const thoughts = await Thought.find();
    res.send(thoughts);
});

thought_router.get('/thoughts/:id', async (req, res) => {
    const thought = await Thought.findOne({
        _id: req.params.id
    });
    res.send(thought)
});

thought_router.post('/thoughts', async (req, res) => {
    const new_thought = await Thought.create(req.body);
    const thought_user = await User.findOneAndUpdate({
        username: req.body.username
    },
    {
        $addToSet: {
            thoughts: new_thought._id
        }
    })
    res.send(`thought ${new_thought._id} created`);
});

thought_router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    const thought = await Thought.findOneAndUpdate({
        _id: req.params.thoughtId
    },
    {
        $addToSet: {
            reactions: req.body
        }
    })
    res.send(`reaction ${req.body.reaction_body} added`)
})

thought_router.put('/thoughts/:id', async (req, res) => {
    const updated_thought = await Thought.findOneAndUpdate({
        _id: req.params.id
    },
    {
        $set: req.body
    });
    res.send(`thought ${updated_thought._id} updated`)
});

thought_router.delete('/thoughts/:id', async (req, res) => {
    const deleted_thought = await Thought.findOneAndDelete({
        id: req.params.id
    });
    res.send(`thought ${deleted_thought._id} deleted`)
});

thought_router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    const thought = await Thought.findOne({
        _id: req.params.thoughtId
    })
    for (let i = 0; i < thought.reactions.length; i++) {
        if (thought.reactions[i]._id === req.params.reactionId) thought.reactions.splice(i, 1)
    }
    res.send(`reaction ${req.params.reactionId} delete from ${thought._id}`)
})

module.exports = thought_router;