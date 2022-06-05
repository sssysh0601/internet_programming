//게시글 작성 화면

import React, { Component, useState, useEffect } from "react";
import LoginHeader from "./LoginHeader";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './Postpage.css'



function Postpage({ match }) {


    
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState(sessionStorage.getItem('user_id'));
    const [post, setPost] = useState([]);

    const handleChange = (e) => {          //글제목 핸들러
        setTitle(e.target.value);
    };


    const submitpost = () => {            //포스팅 추가 (임시)
        const post = {
           title: title,
           writer: writer,
           text:text,
           ID: sessionStorage.getItem('user_id'),
           
        };
  
        fetch("http://localhost:3001/write", {
           method: "post", // 통신방법
           headers: {
              "content-type": "application/json",
           },
           body: JSON.stringify(post),
        })
        alert("게시글 작성 완료")
        window.location.replace("/");
     };

    return (
        <div className="App">  
            <LoginHeader />
            <div className="wrap">
                <div className="wrapPost">
                <h1>게시글 작성</h1>
                <div>
                    <input className="title"  onChange={handleChange} name="title" placeholder="제목" autoComplete="off" />

                </div>
                <CKEditor className='editor' editor={ClassicEditor}
                onReady={editor=>{}}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setText(data);
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />

                <input className="commendinputbtn" onClick={()=>{submitpost()}} type="button"  value="게시글 등록"/>
                <Link to='/'><input type="button"    className="commendinputbtn"  value="돌아가기"/></Link>
                </div>
            </div>
            <Footer />
        </div>

    )
}
export default Postpage;
