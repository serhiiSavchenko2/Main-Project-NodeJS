const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;



//------Cart------------
//Serhii - id = 3
//Arsenii - id = 5
//Danil - id = 12
//.....

// ======Cart-item====
//1 - cart_id = 3 | product_id = 356 | qty = 2
//2 - cart_id = 3 | product_id = 7382 | qty = 1
//3 - cart_id = 12 | product_id = 356 | qty = 4
//.....


//----------Product---------------
//Juice - id = 356
//Book - id = 7382
//Milk - id = 78123
//......

