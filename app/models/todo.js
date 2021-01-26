const { Schema, model } = require('mongoose');

const Todo = Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
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

Todo.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Todo", Todo);