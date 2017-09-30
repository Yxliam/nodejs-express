exports.home = function(req,res){
    res.render('home',{'title':'首页','username':req.session.user});
}