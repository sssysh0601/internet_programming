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


app.post("/write", (req,res)=>{
    const kind = req.body.kind;
    const title = req.body.title;
    const writer = req.body.writer;
    
    // console.log(req.body);
    connection.query("INSERT INTO post(kind, post_title, post_writer,post_date) values (?,?,?,default)",[kind,title,writer],
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
app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`); // '가 아닌 좌측상단의 esc버튼 밑의 `다.
})








/*const express = require("express"); 
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

app.get('/', (req, res) =>{
    res.send('혁이는 코딩 중!')
});



app.post("/idplz", (req,res)=>{
    const test = req.body.test;
    // console.log(req.body);
    connection.query("INSERT INTO test (post_title) values (?)",[test],
    function(err,rows,fields){
        if(err){
            console.log("실패");
            // console.log(err);
        }else{
            console.log("성공");
            // console.log(rows);
        };
    });

    
});

app.post("/callbody", (req,res)=>{
    connection.query("SELECT * FROM test",
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
        }else{
            console.log("불러오기 성공");
            res.json(rows[1]);
        }
    })
})

app.post("/callbody2", (req,res)=>{
    const test = req.body.test;
    connection.query("UPDATE test SET post_title=(?) where post_id=4",[test],
    function(err,rows,fields){
        if(err){
            console.log("수정 실패");
        }else{
            console.log("수정 성공");
            res.json(rows[3]);
        }
    })
})

app.post("/write", (req,res)=>{
    const kind = req.body.kind;
    const title = req.body.title;
    const writer = req.body.writer;
    
    // console.log(req.body);
    connection.query("INSERT INTO post(kind, post_title, post_writer,post_date) values (?,?,?,default)",[kind,title,writer],
    function(err,rows,fields){
        if(err){
            console.log("실패");
            // console.log(err);
        }else{
            console.log("성공");
            // console.log(rows);
        };
    });

    
});
app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`); // '가 아닌 좌측상단의 esc버튼 밑의 `다.
})*/