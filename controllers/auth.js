const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    console.log(req.session);
    console.log(req.session.isLoggedIn);

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuth: req.session.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    User.findById('67fa56b9099525f6a0e062d5')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};