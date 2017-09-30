var express = require('express');
var router = express.Router();
var login = require('../model/login');
var home = require('../model/home');


//login 


router.get('/',login.login);
router.get('/login',login.login);
router.post('/login',login.Plogin)
router.get('/register',login.register);
router.post('/register',login.doregister);
router.get('/logout',login.logout);

//首页
router.get('/home',home.home);


module.exports = router;
