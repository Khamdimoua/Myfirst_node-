const productsController = require("../controllers/product.controller");
const { verifyToken } = require("../middleware");

module.exports = (app) => {
    app.post('/products', verifyToken, productsController.create);
    app.get('/products/getAll', verifyToken, productsController.getAll);
    app.get('/products/:id', verifyToken, productsController.getOne);
    app.put('/products/:id', verifyToken, productsController.updated);
    app.delete('/products/:id', verifyToken, productsController.delete);
}