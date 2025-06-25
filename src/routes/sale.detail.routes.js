const express = require('express');
const saleDetailController = require('../controllers/sale.detail_controller');

module.exports = (app) => {
    app.post('/sale-details', saleDetailController.createSaleDetail);
    app.get('/sale-details', saleDetailController.getAllSaleDetails);
    app.get('/sale-details/:id', saleDetailController.getSaleDetailById);
    app.put('/sale-details/:id', saleDetailController.updateSaleDetail);
    app.delete('/sale-details/:id', saleDetailController.deleteSaleDetail);
}