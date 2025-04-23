const productsController = require("../controllers/product.controller");

module.exports = (app) => {
    app.post('/products', productsController.create);
    app.get('/products', productsController.getAll);
    app.get('/products/:id', productsController.getOne);
    app.put('/products/:id', productsController.updated);
    app.delete('/products/:id', productsController.delete);
}