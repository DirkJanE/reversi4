const express = require('express');
const routers = express.Router();

routers.get('/', (req, res) => {
    res.send('Server is up and running')
});

module.exports = routers;