import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './contents.css';

var imageinx = 0;
function createData(URL) {
   var slide = {
      ImageURL: URL
   }
   return slide;

};

const rows = [
   createData("/img1.jpg"),
   createData("/img2.jpg"),
   createData("/img3.jpg"),

]

function Contents(props) {

   const [image, setimage] = useState(rows[imageinx].ImageURL);

   const nextimg = () => {
      if (imageinx == rows.length - 1) {
         imageinx = 0;
         setimage(rows[imageinx].ImageURL);
      }
      else
         setimage(rows[++imageinx].ImageURL);
      console.log(imageinx);
   }

   const previmg = () => {
      if (imageinx == 0) {
         imageinx = rows.length - 1;
         setimage(rows[imageinx].ImageURL);
      }
      else
         setimage(rows[--imageinx].ImageURL);
      console.log(imageinx);
   }



   const [ID, setId] = useState('');
   const [pass, setPass] = useState('');
   const [temppass, setTemppass] = useState([]);
   const [postcnt, setpostcnt] = useState(0);
   const [login, setlogin] = useState(false);

   const [text, setText] = useState('');
   const [title, setTitle] = useState('');
   const [writer, setWriter] = useState('');
   const [post, setPost] = useState([]);


   const handleChange1 = (e) => {           //ID 핸들러
      setId(e.target.value);
   };
   const handleChange2 = (e) => {           //비밀번호 핸들러
      setPass(e.target.value);
   };

   const handleChange3 = (e) => {          //글종류 핸들러
      setText(e.target.value);
   };
   const handleChange4 = (e) => {          //글제목 핸들러
      setTitle(e.target.value);
   };
   const handleChange5 = (e) => {          //작성자 핸들러
      setWriter(e.target.value);
   };

   const submituser = () => {            //로그인 함수
      const user = {
         ID: ID,
         pass: pass,
      };

      fetch("http://localhost:3001/login", {
         method: "post", // 통신방법
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((json) => {
            setTemppass(json)
         });

   };

   const getpost = ()=>{
      const user = {
         ID: ID,
      };

      fetch("http://localhost:3001/getpost", {
         method: "post", // 통신방법
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((json) => {
            setpostcnt(json)
         });
      }
      
   useEffect(() => {
      
      if (temppass.pass === pass) {
         alert("로그인성공");
        setlogin(true);
        sessionStorage.setItem('user_id', ID)
        getpost();
        document.location.href='/';
      }

    }, [temppass]);


   const submitpost = () => {            //포스팅 추가 (임시)
      const post = {
         kind: text,
         title: title,
         writer: writer,
         ID: ID,
      };

      fetch("http://localhost:3001/write", {
         method: "post", // 통신방법
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(post),
      })
      loadpost();
      getpost();
   };


   const loadpost = () => {               //포스팅 새로 고침해서 가져오기
      fetch("http://localhost:3001/load", {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(),
      })
         .then((res) => res.json())
         .then((json) => {
            setPost(json);
         });
   };

   const deletepost = () => {               //포스팅 삭제
      fetch("http://localhost:3001/deletepost", {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(),
      })
         .then((res) => res.json())
         .then((json) => {
            setPost("");
         });
   };

   useEffect(() => {                        //포스팅 가져오기 
      fetch("http://localhost:3001/load", {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(),
      })
         .then((res) => res.json())
         .then((json) => {
            setPost(json);
         });
   }, [])


   return (
      <><div className="side">
         <table className="logintable" border='1'>
                  <tr>
                  <h5>ID</h5>
                     <input onChange={handleChange1} name="id" placeholder="ID" autoComplete="off"/>
                  </tr>
                  {/* <tr>&nbsp;</tr> */}
                  <tr>
                  <h5>Password</h5>
                     <input onChange={handleChange2} name="id" placeholder="PASS"  autoComplete="off"/>
                  </tr>
                  <button onClick={submituser}>로그인</button>
                  <Link to="/signup"><button>회원가입</button></Link>
         
         </table>
      </div>

         <div className="container" style={{ fontFamily: 'Noto Sans Korean,Malgun Gothic,sans-serif' }}>
            <div className="lf-menu-nav"><button class="btn1" type="button" onClick={previmg}>버튼1</button><img className="imgslide" src={image}></img>
               <button class="btn2" type="button" onClick={nextimg}>버튼2</button></div>
            <div style={{ padding: "0 12px" }}>
               <div className="tablediv">
                  <table className="board_list text-center" border="1">
                     <colgroup>
                        <col width="10%" />
                        <col width="50%" />
                        <col width="*" />
                        <col width="*" />
                     </colgroup>
                     <thead>
                        <tr>
                           <th>번호</th>
                           <th>제목</th>
                           <th>작성자</th>
                           <th>작성일시</th>
                        </tr>
                     </thead>
                     <tbody>
                     {post != "" ? <>    <tr>
                           <td>-</td>
                           <td className="text-left">
                              <Link to="/">명지NOTICE 이용방법</Link></td>
                           <td>10조</td>
                           <td>-</td>
                        </tr>
                        
                           {post.map(posting => <tr>
                              <td>{posting.post_id}</td>
                              <td className="text-left">
                                 <Link to={`/posting/${posting.post_id}`}>
                                    {posting.post_title}</Link></td>
                              <td>{posting.post_writer}</td>
                              <td>{posting.post_date}</td>
                           </tr>)}</>
                           : <>    <tr>
                           <td></td>
                           <td className="text-left">
                              <Link to="/">명지NOTICE 이용방법</Link></td>
                           <td>10조</td>
                           <td></td>
                        </tr></>}
                     </tbody>
                  </table>
               </div>
            </div>
         </div></>
   )

}
export default Contents;






