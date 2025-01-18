const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice){
        //Отримати корзину
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            //Проаналізувати корзину (інсуючі чи не існуючі товари)
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            //Додати товар / збільшити його кількість
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [ ...cart.products ];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [ ...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;

            //Зберегти корзину
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }    
}

//   -1   0  1   2  3  4  5   6
// arr   [7, 81, 9, 3, 8, 12, 3]
// arr[2] = 13;
// arr   [7, 81, 13, 3, 8, 12, 3]



//id
//qty
//totalPrice

// [{id, qty},{id, qty},{id, qty}....{id, qty}, {id, qty}]