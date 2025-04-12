const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('67fa56b9099525f6a0e062d5')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
    //next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect('mongodb+srv://serhiisavchenko2:<Pass>@cluster0.aw9rm.mongodb.net/shop?retryWrites=true')
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
//mongodb+srv://serhiisavchenko2:<Pass>@cluster0.aw9rm.mongodb.net/shop?retryWrites=true