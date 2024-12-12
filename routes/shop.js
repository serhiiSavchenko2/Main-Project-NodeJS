const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

//  E:\views\shop.html
//  E:/views/shop.html
router.get('/', (req, res, next) => { 
    const products = adminData.products;
    res.render('shop', {prods: products, pageTitle: 'Shop #1'});
});

module.exports = router;