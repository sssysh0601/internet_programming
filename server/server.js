const express = require("express"); 
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");


var connection = mysql.createConnection({
    host : "localhost",
    user : "root", //mysql의 id
    password : "1234", //mysql의 password
    database : "inter", //사용할 데이터베이스
});

connection.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.post("/signup", (req,res)=>{
    const ID = req.body.ID;
    const pass = req.body.pass;

    connection.query("INSERT INTO user(ID, pass) values (?,?)",[ID,pass],
    function(err,rows,fields){
        if(err){
            console.log("가입 실패");
            // console.log(err);
        }else{
            console.log("가입 성공");
            // console.log(rows);
        };
    });

    
});

app.post("/login", (req,res)=>{
    const ID = req.body.ID;
    
    // console.log(req.body);
    connection.query("SELECT * from user where ID=?",[ID],
    function(err,rows,fields){
        if(err){
            console.log("잘못된 정보");
        }else{
            console.log("정확한 정보");
            res.json(rows[0]);
        };
    }); 
});

app.post("/getpost", (req,res)=>{
    const ID = req.body.ID;
    connection.query("SELECT count(*) as 'count' from post where user_id=?",[ID],
    function(err,rows,fields){
        if(err){
            console.log("게시글 없음");
        }else{
            console.log("게시글 출력");
            res.json(rows[0]);
        };
    });

    
});

app.post("/load", (req,res)=>{
    connection.query("SELECT post_id, kind, post_title,post_writer, SUBSTRING_INDEX(post_date,' ',1)as post_date FROM post;",
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
        }else{
            console.log("불러오기 성공");
            res.json(rows);
        }
    })
})

app.post("/load2", (req,res)=>{
    const user_id =req.body.ID;
    connection.query("SELECT post_id, kind, post_title,post_writer, SUBSTRING_INDEX(post_date,' ',1)as post_date FROM post where user_id=?;",[user_id],
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
        }else{
            console.log("불러오기 성공");
            res.json(rows);
        }
    })
})

app.post("/load3", (req,res)=>{
    const post_id =req.body.ID;
    connection.query("SELECT * FROM post where post_id=?;",[post_id],
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
        }else{
            console.log("불러오기 성공");
            res.json(rows[0]);
        }
    })
})


app.post("/deletepost", (req,res)=>{
    connection.query("DELETE FROM post where post_id=(select post_id from(select max(post_id) from post)as a);",
    function(err,rows,fields){
        if(err){
            console.log("삭제 실패");
        }else{
            console.log("삭제 성공");
            res.json(rows);
        }
    })
})
app.post("/deletepost2", (req,res)=>{
    const post_id = req.body.post_id;
    connection.query("DELETE FROM post where post_id=?;",[post_id],
    function(err,rows,fields){
        if(err){
            console.log("삭제 실패");
        }else{
            console.log("삭제 성공");
            res.json(rows);
        }
    })
})


app.post("/write", (req,res)=>{
    const text = req.body.text;
    const title = req.body.title;
    const writer = req.body.writer;
    const ID = req.body.ID;
    // console.log(req.body);
    connection.query("INSERT INTO post(text,kind, post_title, post_writer,post_date,user_id) values (?,'자유글',?,?,default,?)",[text,title,writer,ID],
    function(err,rows,fields){
        if(err){
            console.log("추가 실패");
            // console.log(err);
        }else{
            console.log("추가 성공");
            // console.log(rows);
        };
    });

    
});

app.post("/getposting", (req,res)=>{
    const post_id = req.body.post_id;

    // console.log(req.body);
    connection.query("select post_id, kind, post_title,post_writer, SUBSTRING(post_date,1,19)as post_date,text from post where post_id=?",[post_id],
    function(err,rows,fields){
        if(err){
            console.log("뽑아오기 실패");
            // console.log(err);
        }else{
            console.log("뽑아오기 성공");
            res.json(rows[0]);
        };
    });
});
    
app.post("/update", (req,res)=>{
    const post_id = req.body.post_id;
    const title = req.body.title;
    const text = req.body.text;
    // console.log(req.body);
    connection.query("UPDATE post set post_title=?,text=? where post_id=?",[title,text,post_id],
    function(err,rows,fields){
        if(err){
            console.log("수정 실패");
            // console.log(err);
        }else{
            console.log("수정 성공");
        };
    });

});
app.post("/writecommend", (req,res)=>{
    const ID = req.body.ID;
    const text = req.body.text;
    const post_id = req.body.post_id;
    connection.query("INSERT INTO commend(ID, text, commend_date, post_id) values (?,?,default,?)",[ID,text,post_id],
    function(err,rows,fields){
        if(err){
            console.log("댓글작성 실패");
        }else{
            console.log("댓글작성 성공");
            res.json(rows);
        }
    })
});

app.post("/getcommend", (req,res)=>{

    const post_id = req.body.post_id;
    connection.query("select  ID,text, SUBSTRING(commend_date,1,19)as commend_date from commend where post_id=?",[post_id],
    function(err,rows,fields){
        if(err){
            console.log("댓글조희 실패");
        }else{
            console.log("댓글조희 성공");
            res.json(rows);
        }
    })
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`); // '가 아닌 좌측상단의 esc버튼 밑의 `다.
})






