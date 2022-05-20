//게시글 보는 화면
import React, { Component, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './Postpage.css'
function Posting({match}) {
    const [text, settext]= useState([]);
    const post_id =match.params.post_id;

    useEffect(()=>{
            const user = {
              post_id: post_id
            };
      
            fetch("http://localhost:3001/getposting", {
               method: "post", // 통신방법
               headers: {
                  "content-type": "application/json",
               },
               body: JSON.stringify(user),
            })
               .then((res) => res.json())
               .then((json) => {
                settext(json)
               });
            
    },[])
 
return(
    <><div dangerouslySetInnerHTML={ {__html: text.text}}>
    </div><h1>{match.params.post_id}</h1></>
)
}
    export default Posting;
    