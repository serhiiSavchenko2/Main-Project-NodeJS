const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;
// collection('users')

// new mongoDb.ObjectId();
const ObjectId = mongoDb.ObjectId;

class User {
    constructor(username, email, id, cart) {
        this.username = username;
        this.email = email;
        this._id = id ? new ObjectId(id) : null;
        this.cart = cart;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const updatedCart = { items: [{ ...product, quantity: 1 }] };
                        //product     { items: [{ {}, quantity: 1 }] }
                        //...product  { items: [{ title: product.title, price: product.price....., quantity: 1 }] }
        const db = getDb();
        return db.collection('users')
                 .updateOne(
                    { _id: this._id }, 
                    { $set: { cart: updatedCart } }
                );
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .findOne({ _id: new ObjectId(userId)})
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => console.log(err));
    }
}   

module.exports = User;