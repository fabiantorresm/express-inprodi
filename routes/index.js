const express = require('express');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hola desde Index');
});

module.exports = router;
