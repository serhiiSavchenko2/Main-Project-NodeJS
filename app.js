const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://serhiisavchenko2:<pass>@cluster0.aw9rm.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
const csrfProtection = csrf();

const errorController = require('./controllers/error');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}` + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
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

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuth = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) return next();
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
    //next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
    res.redirect('/500');
});

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(8100);
    })
    .catch(err => console.log(err));

//db password: mysql555
//KIpOt0KETY2ddeeS