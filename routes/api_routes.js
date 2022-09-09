const api_router = require('express').Router();
const Users = require('../models/Users');
const Thoughts = require('../models/Thoughts');

api_router.get('/users', async (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)})
});

api_router.post('/users', async (req, res) => {
    Users.create({
        email: req.body.email,
        thoughts: req.body.thoughts
      })
        .then(createdUsers => {
            res.json(createdUsers)})
});

module.exports = api_router;