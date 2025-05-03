const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://serhiisavchenko2:<pass>@cluster0.aw9rm.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session(
        { 
            secret: 'my secret', 
            resave: false, 
            saveUninitialized: false,
            store: store 
        }
    )
);

// app.use((req, res, next) => {
//     User.findById('67fa56b9099525f6a0e062d5')
//         .then(user => {
//             req.user = user;
//             next();
//         })
//         .catch(err => console.log(err));
//     //next();
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Serhii',
                    email: 'test@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(8100);
    })
    .catch(err => console.log(err));

//db password: mysql555
//KIpOt0KETY2ddeeS