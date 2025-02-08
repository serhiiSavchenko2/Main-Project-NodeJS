const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
    constructor(id, t, imageUrl, desc, price) {
        this.id = id;
        this.title = t;
        this.imageUrl = imageUrl;
        this.description = desc;
        this.price = price;
    }

    save() {
        return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.description, this.imageUrl]
        );
    }

    static fetchAll(){
        return db.execute('SELECT * FROM products');
    }

    static findById(id){
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }

    static deleteById(id) {
        
    }
}

// INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)