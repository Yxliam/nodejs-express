var mysqlFn = require('../db/mysql_client');
var tool = require('../until/tool');
var md5 = require('md5');
exports.Gologin = function(req,res){
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.render('login',{'title':'登录'});
    }
}
exports.login = function(req,res){
    res.render('login',{'title':'登录'});
}

exports.Plogin = function(req,res){
    var user = req.body.username;
    var password = md5(req.body.password);
    var sql = "SELECT * FROM user WHERE username =? and password=?";
    var sqlParm = [user,password];
    mysqlFn.query(sql,sqlParm,function(result){
        if(result){
            req.session.user = user;
            res.json(tool.responseJSON('ok',1));            
        }else{
            res.json(tool.responseJSON('登录失败',0))
        }
    })
}

//注册路由
exports.register = function(req,res){
    res.render('register',{'title':'注册'});
}
exports.doregister = function(req,res){
    var user = req.body.username,
    password = req.body.password;    
    if(user == '' || password == ''){
        res.json(tool.responseJSON('用户名或者密码为空',0));
    }
    password = md5(req.body.password);    
    var selSql = 'SELECT * from user WHERE username=?';
    var selSqlParm = [user];
    mysqlFn.query(selSql,selSqlParm,function(result){
        if(result){
            res.json(tool.responseJSON('该用户已存在',2));
        }else{
            var sql = "INSERT INTO user(username,password) VALUES(?,?)";
            var sqlParm = [user,password];
            mysqlFn.query(sql,sqlParm,function( result ){
                if( result ){
                        res.json(tool.responseJSON('注册成功',1));
                }else{
                    res.json(tool.responseJSON('注册失败',2));
                }
            })
        }
    })

}

exports.logout = function(req,res){
    req.session.user = undefined;
    res.redirect('/login');
}