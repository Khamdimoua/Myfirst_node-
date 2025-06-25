const Sales = require('../models/sale.model');

// ສ້າງການຂາຍໃໝ່
exports.createSale = async(req, res) => {
    try {
        const sale = await Sales.create({...req.body });
        res.status(201).send(sale);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ດຶງລາຍການການຂາຍທັງໝົດ
exports.getAllSales = async(req, res) => {
    try {
        const sales = await Sales.findAll();
        res.status(200).send(sales);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ດຶງການຂາຍຕາມ ID
exports.getSaleById = async(req, res) => {
    try {
        const sale = await Sales.findByPk(req.params.id);
        if (!sale) {
            return res.status(404).send({ message: 'Sale not found' });
        }
        res.status(200).send(sale);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ອັບເດດການຂາຍ
exports.updateSale = async(req, res) => {
    try {
        const [updated] = await Sales.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedSale = await Sales.findByPk(req.params.id);
            res.status(200).send(updatedSale);
        } else {
            res.status(404).send({ message: 'Sale not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ລຶບການຂາຍ
exports.deleteSale = async(req, res) => {
    try {
        const deleted = await Sales.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(200).send({ message: 'Sale deleted successfully' });
        } else {
            res.status(404).send({ message: 'Sale not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};