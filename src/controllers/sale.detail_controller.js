const SaleDetail = require('../models/sale.detail.model');
const Product = require('../models/product.model');

// ເພີ່ມລາຍລະອຽດການຂາຍ
exports.createSaleDetail = async(req, res) => {
    try {
        const saleDetail = await SaleDetail.create({...req.body });
        res.status(201).send(saleDetail);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ດຶງລາຍລະອຽດການຂາຍທັງໝົດ
exports.getAllSaleDetails = async(req, res) => {
    try {
        const saleDetails = await SaleDetail.findAll({
            include: [{
                model: Product,
                attributes: ['name', 'price', 'category_id']
            }]
        });
        res.status(200).send(saleDetails);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ດຶງລາຍລະອຽດການຂາຍຕາມ ID
exports.getSaleDetailById = async(req, res) => {
    try {
        const saleDetail = await SaleDetail.findByPk(req.params.id, {
            include: [{
                model: Product,
                attributes: ['name', 'price', 'category_id']
            }]
        });

        if (!saleDetail) {
            return res.status(404).send({ message: 'Sale detail not found' });
        }

        res.status(200).send(saleDetail);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ອັບເດດລາຍລະອຽດການຂາຍ
exports.updateSaleDetail = async(req, res) => {
    try {
        const [updated] = await SaleDetail.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedSaleDetail = await SaleDetail.findByPk(req.params.id, {
                include: [{
                    model: Product,
                    attributes: ['name', 'price', 'category_id']
                }]
            });
            res.status(200).send(updatedSaleDetail);
        } else {
            res.status(404).send({ message: 'Sale detail not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ລຶບລາຍລະອຽດການຂາຍ
exports.deleteSaleDetail = async(req, res) => {
    try {
        const deleted = await SaleDetail.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(200).send({ message: 'Sale detail deleted successfully' });
        } else {
            res.status(404).send({ message: 'Sale detail not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};