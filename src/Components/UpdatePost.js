//게시글 수정 화면

import React, { Component, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './Postpage.css'
function UpdatePost() {

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState(sessionStorage.getItem('user_id'));
    const [post, setPost] = useState([]);

    const handleChange = (e) => {          //글제목 핸들러
        setTitle(e.target.value);
    };


    const submitpost = () => {            //포스팅 수정
        alert(text);
        alert(title);
        const post = {
           title: title,
           text:text,
           post_id: sessionStorage.getItem('post_id'),
        };
  
        fetch("http://localhost:3001/update", {
           method: "post", // 통신방법
           headers: {
              "content-type": "application/json",
           },
           body: JSON.stringify(post),
        })
     };

const load3 = ()=>{
    const user={
        ID:sessionStorage.getItem('post_id'),
    };
    fetch("http://localhost:3001/load3", {
           method: "post", // 통신방법
           headers: {
              "content-type": "application/json",
           },
           body: JSON.stringify(user),
        }).then((res) => res.json())
        .then((json) => {
           setPost(json)    
        });
}

useEffect(()=>{
    load3();
},[])

useEffect(()=>{
    setText(post.text);
    setTitle(post.post_title);
},[post])

    return (    
        <div className="App">
            <Header />
            <div className='container'>
                <h1>게시글 수정</h1>
                <div>
                    <input className="title" onChange={handleChange} name="title" value={title} autoComplete="off" />

                </div>
                <CKEditor className='editor' editor={ClassicEditor}
                onReady={editor=>{}}
                data={post.text}
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


                <input  type="button"    className="commendinputbtn"  onClick={()=>{submitpost()}} value="게시글 수정"/>
                <Link to='/mypage'><input type="button"    className="commendinputbtn"  value="돌아가기"/></Link>
            </div>
            
            <Footer />
        </div>

    )
}
export default UpdatePost;
