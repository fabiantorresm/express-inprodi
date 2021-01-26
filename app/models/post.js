const {Schema, model} = require('mongoose')

const Post = new Schema({
    name: String,
    description: String,
    created: { 
        type: Date,
        default: Date.now
    },
    updated: { 
        type: Date,
        default: Date.now
    }
});

Post.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Post', Post)