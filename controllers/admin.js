const product = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.getProducts = (req, res, next) => { 
    Product.find()
        .then(products => {
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl; 
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
        userId: req.user
    });
    product.save()
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Update Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            })
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const updated_id = req.body.productId;
    const updated_title = req.body.title;
    const updated_imageUrl = req.body.imageUrl;
    const updated_description = req.body.description;
    const updated_price = req.body.price;

    Product.findById(updated_id)
        .then(product => {
            product.title = updated_title;
            product.price = updated_price;
            product.description = updated_description;
            product.imageUrl = updated_imageUrl;
            return product.save();
        })
        .then(result => {
            console.log('Updated product!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId)
        .then(result => {
            console.log('Product deleted!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};