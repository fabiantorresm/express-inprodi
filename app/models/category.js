const {Schema, model} =  require('mongoose')

const Category = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    created: { 
        type: Date,
        default: Date.now
    },
    updated: { 
        type: Date,
        default: Date.now
    }
});

Category.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Category', Category);