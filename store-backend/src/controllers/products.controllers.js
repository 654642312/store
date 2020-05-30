const productsCtrl = {}
const path = require('path');
const fs = require('fs-extra');

const { v4 } = require('uuid');
const { getConnection } = require('../database');

productsCtrl.getProducts = (req, res) => {
    const products = getConnection().get('products').value();
    res.json(products);
};

productsCtrl.getProduct = (req, res) => {
    const product = getConnection().get('products')
    .find({id:  req.params.id}).value();

    res.json(product);
};

productsCtrl.createProducts = (req, res) => {
    const newProduct = {
        id: v4(),
        name: req.body.author,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imgPath: req.file.path
    }
    getConnection().get('products').push(newProduct).write();
    res.json(newProduct);
};

productsCtrl.updateProducts = async (req, res) => {
    const product = await getConnection.get('products')
    .find({id: req.params.id})
    .assign(req.body)
    .write();
    res.json('save');
};

productsCtrl.deleteProducts = (req, res) => {
    const result = getConnection().get('products')
    .remove({id: req.params.id})
    .write();
    if(result){
        fs.unlink(path.resolve(result.imgPath));
    }
    res.json(result);
};

module.exports = productsCtrl;

