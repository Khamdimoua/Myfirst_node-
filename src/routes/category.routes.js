const categoriesController = require("../controllers/category_controller");
const { verifyToken } = require("../middleware");

module.exports = (app) => {
    app.post('/categories', verifyToken, categoriesController.create);
    app.get('/categories', verifyToken, categoriesController.getAll);
    app.get('/categories/:id', verifyToken, categoriesController.getOne);
    app.put('/categories/:id', verifyToken, categoriesController.updated);
    app.delete('/categories/:id', verifyToken, categoriesController.delete);
}