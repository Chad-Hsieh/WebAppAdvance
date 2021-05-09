const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
});

module.exports = mongoose.model('Post', PostSchema)