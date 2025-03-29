const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'List of Products',
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop #1',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

// exports.getCart = (req, res, next) => {
//     req.user.getCart()
//         .then(cart => {
//             return cart.getProducts();
//         })
//         .then(products => {
//             res.render('shop/cart', {
//                 pageTitle: 'Your Cart',
//                 path: '/cart',
//                 products: products
//             });
//         })
//         .catch(err => console.log(err));
// };

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

// exports.postCartDelete = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.user.getCart()
//         .then(cart => {
//             return cart.getProducts({ where: { id: prodId } });
//         })
//         .then(products => {
//             const product = products[0];
//             return product.cartItem.destroy();
//             //return products[0].cartItem.destroy();
//         })
//         .then(result => {
//             res.redirect('/cart');
//         })
//         .catch(err => console.log(err));
// }

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         pageTitle: 'Your Current Order',
//         path: '/checkout'
//     });
// };

// exports.getOrders = (req, res, next) => {
//     req.user.getOrders({include: ['products']})
//         .then(orders => {
//             res.render('shop/orders', {
//                 pageTitle: 'Your Orders',
//                 path: '/orders',
//                 orders: orders
//             });
//         })
//         .catch(err => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//     let productList;
//     let fetchedCart;
//     req.user.getCart()
//         .then(cart => {
//             fetchedCart = cart;
//             return cart.getProducts();
//         })
//         .then(products => {
//             productList = products;
//             return req.user.createOrder();
//         })
//         .then(order => {
//             return order.addProducts(productList.map(product => {
//                 product.orderItem = { quantity: product.cartItem.quantity };
//                 return product;
//             }));
//         })
//         .then(result => {
//             return fetchedCart.setProducts(null);
//         })
//         .then(result => {
//             res.redirect('/orders');
//         })
//         .catch(err => console.log(err));
// };