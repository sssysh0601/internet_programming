import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Mypage.css';
import LoginHeader from "./LoginHeader";
import Footer from "./Footer";

function Mypage() {


   const [postcnt, setpostcnt] = useState(0);
   const [post, setPost] = useState([]);

   const [commends, setcommends] = useState([]);
   const [commendcnt, setcommendcnt] = useState(0);

   const [mode, setmode] = useState("post");

   const [btn, setbtn] = useState("댓글 조회");

   const changemode = () => {
      if (mode == "post"){
         setmode("commend");
         setbtn("게시글 조회");
      }
      else{
         setmode("post");
         setbtn("댓글 조회");
      }
   };


   const getpost = () => {
      const user = {
         ID: sessionStorage.getItem('user_id'),
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

   const getcommend = () => {
      const user = {
         ID: sessionStorage.getItem('user_id'),
      };

      fetch("http://localhost:3001/getcommendcnt", {
         method: "post", // 통신방법
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((json) => {
            setcommendcnt(json)
         });
   }

   useEffect(() => {                        //포스팅 가져오기 
      const user = {
         ID: sessionStorage.getItem('user_id'),
      };

      fetch("http://localhost:3001/load2", {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((json) => {
            setPost(json);
         });
      getpost();

      fetch("http://localhost:3001/loadcommend", {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((json) => {
            setcommends(json);
            console.log(commends);
         });
      getcommend();
   }, [])

   const updatepost = post_id => {                    //포스팅 수정
      sessionStorage.setItem('post_id', post_id);
      window.location.replace(`/UpdatePost/${sessionStorage.getItem('post_id')}`);
   }

   const deletepost = post_id => {               //포스팅 삭제
      const user = {
         post_id: post_id,
      };
      fetch("http://localhost:3001/deletepost", {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
      document.location.href = '/mypage';
   };

   const deletcommend = commend_date => {               //포스팅 삭제
      const user = {
         commend_date: commend_date,
      };
      fetch("http://localhost:3001/deletecommends", {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
      document.location.href = '/mypage';
   };
   return (
      <div className="App">
         <LoginHeader />
         <div class="wrap">
            <div class="mypage">
               <img id="imgLogin" src="img_mypage.png" alt="login text" />
               <div class="wrap-image">
                  <img id="imgUser" src="icon_user.png" alt=""></img>
               </div>
               <div class="mypageContent">
                  <h3>ID : {sessionStorage.getItem('user_id')}</h3>
                  {mode == "post" ?
                     <h3>게시물 수 : {postcnt.count}</h3>
                     :
                     <h3>댓글 수 : {commendcnt.count}</h3>
                  }
               </div>
               <div className="mypage_tablediv">
                  <table className="mypage_board_list text-center" border="1">
                     {mode == "post" ?
                        <><colgroup>
                           <col width="50%" />
                           <col width="*" />
                           <col width="15%" />
                           <col width="*" />
                           <col width="*" />
                        </colgroup><thead>
                              <tr>
                                 <th>제목</th>
                                 <th>작성자</th>
                                 <th>작성일시</th>
                                 <th>수정</th>
                                 <th>삭제</th>
                              </tr>
                           </thead><tbody>
                              {post != "" ? <>
                                 {post.map(posting => <tr>
                                    <td className="text-left"> <Link to={`/posting/${posting.post_id}`}>{posting.post_title}</Link></td>
                                    <td>{posting.post_writer}</td>
                                    <td>{posting.post_date}</td>
                                    <td><button onClick={() => { updatepost(posting.post_id); }}>수정</button></td>
                                    <td><button onClick={() => { deletepost(posting.post_id); }}>삭제</button></td>
                                 </tr>)}</>
                                 : <><tr>
                                    <td>&nbsp;</td>
                                    <td></td>
                                    <td> </td>
                                    <td></td>
                                    <td></td>
                                 </tr></>}
                           </tbody></>
                        :
                        <><colgroup>
                           <col width="35%" />
                           <col width="35%" />
                           <col width="12%" />
                           <col width="12%" />
                           <col width="*" />
                        </colgroup><thead>
                              <tr>
                                 <th>게시글</th>
                                 <th>댓글</th>
                                 <th>작성자</th>
                                 <th>작성일시</th>
                                 <th>삭제</th>
                              </tr>
                           </thead><tbody>
                              {commends != "" ? <>
                                 {commends.map(commends => <tr>
                                    <td className="text-left"> <Link to={`/posting/${commends.post_id}`}>{commends.post_title}</Link></td>
                                    <td>{commends.text}</td>
                                    <td>{commends.ID}</td>
                                    <td>{commends.commend_date}</td>
                                    <td><button onClick={() => { deletcommend(commends.commend_date); }}>삭제</button></td>
                                 </tr>)}</>
                                 : <><tr>
                                    <td>&nbsp;</td>
                                    <td></td>
                                    <td> </td>
                                    <td></td>
                                 </tr></>}
                           </tbody></>
                     }
                  </table>
               </div>
               <br/>
               <input type="button" onClick={changemode} value={btn}/>
            </div>
         </div>
         <Footer />
      </div>
   )
} export default Mypage;