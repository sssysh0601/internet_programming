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
   createData("img1.jpg"),
   createData("img2.jpg"),
   createData("img3.jpg"),

]

function Contents() {

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




   const [text, setText] = useState('');
   const [title, setTitle] = useState('');
   const [writer, setWriter] = useState('');

   const [post, setPost] = useState([]);

   const handleChange1 = (e) => {
      setText(e.target.value);
   };
   const handleChange2 = (e) => {
      setTitle(e.target.value);
   };
   const handleChange3 = (e) => {
      setWriter(e.target.value);
   };

   const submitpost = () => {            //포스팅 추가 (임시)
      const post = {
         kind: text,
         title: title,
         writer: writer,
      };

      fetch("http://localhost:3001/write", {
         method: "post", // 통신방법
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(post),
      })
         .then((res) => res.json())
         .then((json) => {
            setText(json);
         });
         loadpost();
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
            setPost(json);
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
      <><div>
         <input onChange={handleChange1} name="id" placeholder="글종류" />
         <input onChange={handleChange2} name="id" placeholder="글제목" />
         <input onChange={handleChange3} name="id" placeholder="작성자" />
         <button onClick={submitpost}>추가하기</button>
         <button onClick={loadpost}>새로고침</button>
         <button onClick={deletepost}>삭제</button>
      </div>

         <div className="container" style={{ fontFamily: 'Noto Sans Korean,Malgun Gothic,sans-serif' }}>
            <div className="lf-menu-nav"><button class="btn1" type="button" onClick={previmg}>버튼1</button><img className="imgslide" src={image}></img>
               <button class="btn2" type="button" onClick={nextimg}>버튼2</button></div>
            <div style={{ padding: "0 12px" }}>
               <div className="tablediv">
                  <table className="board_list text-center" border="1">
                     <colgroup>
                        <col width="5%" />
                        <col width="*" />
                        <col width="50%" />
                        <col width="*" />
                        <col width="*" />
                     </colgroup>
                     <thead>
                        <tr>
                           <th>번호</th>
                           <th>구분</th>
                           <th>제목</th>
                           <th>작성자</th>
                           <th>작성일시</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>공지사항</td>
                           <td className="text-left">
                              <Link to="/">명지NOTICE 이용방법</Link></td>
                           <td>10조</td>
                           <td></td>
                        </tr>
                        {post ? <>
                           {post.map(posting => <tr>
                              <td>{posting.post_id}</td>
                              <td>{posting.kind}</td>
                              <td className="text-left">
                                 <Link to="/posting:{posting.post_id}">
                                    {posting.post_title}</Link></td>
                              <td>{posting.post_writer}</td>
                              <td>{posting.post_date}</td>
                           </tr>)}</>
                           : <></>}
                     </tbody>
                  </table>
               </div>
               <a href="/noticewrite"><button className="writebutton">글쓰기</button></a>
            </div>
         </div></>
   )

}
export default Contents;









/*import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './contents.css';

var index = 1;
var imageinx = 0;
function createData(URL) {
   var slide = {
      ImageURL: URL
   }
   return slide;

};

const rows = [
   createData("img1.jpg"),
   createData("img2.jpg"),
   createData("img3.jpg"),

]

function Contents() {

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




   const [text, setText] = useState('');
   const [id, setId] = useState([]);


   
  const handleChange = (e) => {            
   setText(e.target.value);
 };
   const submitId = () => {            //추가하기
      const post = {
         test: text,
      };

      fetch("http://localhost:3001/idplz", {
      method : "post", // 통신방법
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(post),
    })
    .then((res)=>res.json())
    .then((json)=>{
     setText(json);
    });
  };

  const onCall =()=>{               //불러오기
   fetch("http://localhost:3001/callbody",{
     method:"post",
     headers : {
       "content-type" : "application/json",
     },
     body : JSON.stringify(),
   })
   .then((res)=>res.json())
   .then((json)=>{
     setId(json.post_title);
   });
 };
 const onCall2 =()=>{            //수정하기
   const post = {
      test: text,
   };
   fetch("http://localhost:3001/callbody2",{
     method:"post",
     headers : {
       "content-type" : "application/json",
     },
     body : JSON.stringify(post),
   })
   .then((res)=>res.json())
   .then((json)=>{
     setId(json.post_title);
   });
 };
   return (
      <><div>
         <input onChange={handleChange} name="id" />
         <button onClick={submitId}>추가하기</button>
         <h1>{text}</h1>
         <h3>{id}</h3>
        <button onClick={onCall}>가져오기</button>
        <button onClick={onCall2}>수정하기</button>
      </div>
      
      <div className="container" style={{ fontFamily: 'Noto Sans Korean,Malgun Gothic,sans-serif' }}>
            <div className="lf-menu-nav"><button class="btn1" type="button" onClick={previmg}>버튼1</button><img className="imgslide" src={image}></img>
               <button class="btn2" type="button" onClick={nextimg}>버튼2</button></div>
            <div style={{ padding: "0 12px" }}>
               <div className="tablediv">
                  <table className="board_list text-center" border="1">
                     <colgroup>
                        <col width="5%" />
                        <col width="*" />
                        <col width="50%" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                     </colgroup>
                     <thead>
                        <tr>
                           <th>번호</th>
                           <th>구분</th>
                           <th>제목</th>
                           <th>작성자</th>
                           <th>작성일시</th>
                           <th>조회수</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>{index}</td>
                           <td>공지사항</td>
                           <td className="text-left">
                              <Link to="/">명지NOTICE 이용방법</Link></td>
                           <td>10조</td>
                           <td></td>
                           <td>12</td>
                        </tr>
                        <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr>
                        <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr>
                        <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr> <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr> <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr> <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr> <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr> <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr>
                        <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr>
                        <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr>
                        <tr>
                           <td>{index++}</td>
                           <td>자유글</td>
                           <td className="text-left">
                              <Link to="/">
                                 1번 게시글</Link></td>
                           <td>1번 작성자</td>
                           <td>2022-04-26</td>
                           <td>12</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <a href="/noticewrite"><button className="writebutton">글쓰기</button></a>
            </div>
         </div></>
   )

}
export default Contents;
*/

/*<tbody>
                     {currentPosts.map(post => (
                        <tr key={post._id}>
                           <td>{post._id}</td>
                           <td>{post.type}</td>
                           <td className="text-left"><Link className="text-ellipsis" to={{ pathname: '/noticeDetail', state: { _id: post._id } }} style={{ color: '#909090' }}>{post.title}</Link></td>
                           <td>{post.userName}</td>
                           <td>{moment(post.date).format('YYYY-MM-DD')}</td>
                           <td>{post.readCount}</td>
                           <td>
                              {post.fileList.length > 0 &&
                                 <img src="/images/board_attach.gif" />
                              }
                           </td>
                        </tr>
                     ))}
                  </tbody>


                  */