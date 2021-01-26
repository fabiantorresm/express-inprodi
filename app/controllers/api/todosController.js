const { response } = require('express');
const Todo = require('../../models/todo');

const getTodos = async(req, res = response) => {
    try {
        // const todos = await Todo.findOne({category: "600a62a86ee150dccab225ab" })
        //     .populate("blogs") // key to populate
        //     .then(user => {
        //         res.json(user); 
        // });
        
        // const todos = await Todo.find().populate('user','user');
        // console.log(todos);
        
        // res.json({
        //     ok: true,
        //     todos
        // });

        const todos = await Todo.find({})
            .populate("category")
            .populate('user', {password:0, __v: 0, })

        res.json(todos)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudo recuperar la información solicitada'
        });
    }
}

const createTodo = async(req, res = response ) => {
    const todo = new Todo( req.body );
    console.log(todo);
    // console.log(req.uid);
    try {
        todo.user = req.uid;
        const isSaveTodo = await todo.save();
        res.json({
            ok: true,
            todo: isSaveTodo
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = { getTodos, createTodo }