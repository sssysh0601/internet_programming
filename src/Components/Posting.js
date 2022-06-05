//게시글 보는 화면
import React, { Component, useState, useEffect } from "react";
import LoginHeader from "./LoginHeader";
import Footer from "./Footer";
import './Posting.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Link } from "react-router-dom";



function Posting({ match }) {

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

    const [image, setimage] = useState(rows[Math.floor(Math.random()*rows.length)].ImageURL);
    const [text, settext] = useState([]);
    const post_id = match.params.post_id;
    const [commend, setcommend] = useState("");
    const [commends, setcommends] = useState([]);

    const handlercommend = (e) => {
        setcommend(e.target.value);
    }

    const submit = () => {
        if (commend != "") {
            const user = {
                ID: sessionStorage.getItem('user_id'),
                text: commend,
                post_id: post_id,
            };

            fetch("http://localhost:3001/writecommend", {
                method: "post", // 통신방법
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            })
            window.location.replace(`/posting/${post_id}`)
        }
    };


    const getcommend = () => {
        const user = {
            post_id: post_id
        };
        fetch("http://localhost:3001/getcommend", {
            method: "post", // 통신방법
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((json) => {
                setcommends(json)
            });

    }

    useEffect(() => {
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

        getcommend();
        setimage(rows[Math.floor(Math.random()*rows.length)].ImageURL);
    }, [])
    return (
        < div className="App" >
            <LoginHeader />
            <div className="wrapPosting">
                <div className="posting">

                    <div className="postingcotent">
                        <div style={{ border: '1px black solid', backgroundColor: '#5A5AFF' }}> <h1>{text.post_title}</h1>
                            <div style={{ borderTop: '1px black solid', height: '40px', backgroundColor: '#FFFFFF' }}>
                                <div style={{ display: 'inline-block', float: 'left' }}>
                                    <h4>작성자: {text.post_writer}
                                    </h4>
                                </div>
                                <div style={{ display: 'inline-block', float: 'right' }}>
                                    <h4>{text.post_date}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div style={{ width:"100%" }}>
                            <br/>
                            <img src={image}></img>
                        </div>                    
                        <div className="postingdiv" dangerouslySetInnerHTML={{ __html: text.text }}>
                        </div>

                    </div>
                    <div>
                        <div>
                            <input type="text" className="commendinput" onChange={handlercommend} />
                            <input type="submit" className="commendinputbtn" value="댓글작성" onClick={submit} />
                            <Link to='/'><input type="button" className="commendinputbtn2" value="돌아가기"/></Link>
                        </div>
                        {commends.map(commends =>
                            <div className="wrapComment">
                                <div>
                                    <h6>작성자: {commends.ID}
                                    </h6>
                                </div>
                                <div style={{}}>
                                    <h4>{commends.text}
                                    </h4>
                                </div>
                                <div style={{}}>
                                    <h6>{commends.commend_date}
                                    </h6>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}
export default Posting;
