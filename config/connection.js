const mongoose = require('mongoose');

mongoose.connect('social_media_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports =mongoose.connection;