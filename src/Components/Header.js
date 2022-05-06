import React,{Component} from "react";
import {Link} from 'react-router-dom';
import './Header.css';
import imgTitle from '../image/img_title.png'

function Header(props){

    return (
        <header className="Header">
            <div className= "Title-contents">
            <div className="Logo">
               <span className="Logo-text">
                   <img src={imgTitle} alt="title image"></img>
               </span>
            </div>
                <nav className="Title-nav">
                <ul>
<<<<<<< HEAD
                <li className="Login-text"><Link to="/login">글쓰기</Link></li>
                        <li className="Join-text"><Link to="/signup">회원가입</Link></li>
=======
                        <li><a href="#">My Page </a></li>
                        <li className="Login-text"><a href="#">Log in</a></li>
                        <li className="Join-text"><a href="#">Sign up</a></li>
>>>>>>> f3c67cf16bcd224e8de7b9961f0f69cb66eb251b

                </ul>
                </nav>
            </div>
        </header>
    );
  
}
export default Header;
