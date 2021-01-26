const { response } = require('express');
const Category = require('../../models/category');

const getCategories = async(req, res = response) => {
    try {
        const categories = await Category.find().populate('user','user');
        // res.json({
        //     ok: true,
        //     categories
        // });
        res.json(categories)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudo recuperar la información solicitada'
        });
    }
}

const createCategory = async(req, res = response ) => {
    const category = new Category( req.body );
    console.log(category);
    try {
        // category.user = req.uid;
        const saveCategory = await category.save();
        res.json({
            ok: true,
            category: saveCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = { getCategories, createCategory }