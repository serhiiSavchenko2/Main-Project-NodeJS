const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0]);
//     })
//     .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()
    .then(result => {
        //console.log(result);
        app.listen(8100);
    })
    .catch(err => console.log(err));

//db password: mysql555