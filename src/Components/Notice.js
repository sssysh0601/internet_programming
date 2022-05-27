import React, { Component, useState, useEffect } from "react";
import LoginHeader from "./LoginHeader";
import Footer from "./Footer";
import './Posting.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'



function Notice({ match }) {

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
        createData("/img4.jpg"),
        createData("/광고2.jpg"),
        createData("/광고3.jpg"),
    ]


    return (
        < div className="App" >
            <LoginHeader />
            <div className="wrapPosting">
                <div className="posting">

                    <div className="postingcotent">
                        <div style={{ border: '1px black solid', backgroundColor: '#5A5AFF' }}> <h1>명지NOTICE 이용방법</h1>
                            <div style={{ borderTop: '1px black solid', height: '40px', backgroundColor: '#FFFFFF' }}>
                                <div style={{ display: 'inline-block', float: 'left' }}>
                                    <h4>작성자: 운영자 </h4>
                                </div>
                                <div style={{ display: 'inline-block', float: 'right' }}>
                                    <h4>공지사항
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="postingdiv" >
                            <p>
                                <h3>
                                1. 로그인, 회원가입을 하셔야 게시글을 작성할 수 있습니다.</h3>
                            </p>
                            <br/>
                            <p><h3>
                                2. 마이페이지에서 작성한 게시글을 수정, 제거할 수 있습니다.</h3>
                            </p>
                            <br/>
                            <p><h3>
                                3. 마이페이지에서 댓글을 삭제할 수 있습니다.</h3>
                            </p>
                            <br/>
                            <p><h3>
                                4. 게시글에 댓글을 작성 할 수 있습니다.</h3>
                            </p>
                            <br/>
                            <p><h3>
                               5. 인격 모독, 언어 폭력 등의 게시글은 운영자가 삭제할 수 있습니다. </h3>
                            </p>
    
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </div >
    )
}
export default Notice;
