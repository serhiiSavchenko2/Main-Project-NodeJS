const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;
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
    User.findById('67e7e74045c005e00c2cd1ac')
        .then(user => {
            req.user = new User(user.username, user.email, user._id, user.cart);
            next();
        })
        .catch(err => console.log(err));
    //next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(8100);
});

//db password: mysql555