const userController = require('../controllers/user_controllers');

module.exports = (app) => {
    app.post("/users", userController.create);
    app.post("/users/login", userController.login);
    app.get("/users", userController.getAll);
    app.get("/users/:id", userController.getOne);
    app.put("/users/:id", userController.update);
    app.delete("/users/:id", userController.delete);
}