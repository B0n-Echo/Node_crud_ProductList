const express = require('express');
const route = express.Router()

const { homeRoutes, add_product, update_product } = require('../services/render');
const controller = require('../controller/controller');


route.get('/', homeRoutes);

route.get('/add-product', add_product)

route.get('/update-product', update_product)


// API
route.post('/api/products', controller.create);
route.get('/api/products', controller.find);
route.put('/api/products/:id', controller.update);
route.delete('/api/products/:id', controller.delete);


module.exports = route