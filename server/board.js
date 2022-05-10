const { Router } = require("express");

Router.get('/write', function(req, res, next){
    res.render('write',{title : "글 작성"});
});

router.post('/write', function(req,res,next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,passwd];
 
 
    var sql = "insert into board(post_id, post_title, contents) values(?,?,?)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
    });
});


