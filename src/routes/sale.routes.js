const saleController = require('../controllers/sale_controller');

module.exports = (app) => {
    app.post('/sales', saleController.createSale);
    app.get('/sales', saleController.getAllSales);
    app.get('/sales/:id', saleController.getSaleById);
    app.put('/sales/:id', saleController.updateSale);
    app.delete('/sales/:id', saleController.deleteSale);
};