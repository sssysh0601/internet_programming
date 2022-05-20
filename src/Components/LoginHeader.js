import React,{Component} from "react";
import {Link} from 'react-router-dom';
import './Header.css';
import imgTitle from '../image/img_title.png'

function LoginHeader(props){

    return (
        <header className="Header">
            <div className= "Title-contents">
            <div className="Logo">
               <span className="Logo-text">
                   <Link to="/"><img src={imgTitle} alt="title image"></img></Link>
               </span>
            </div>
                <nav className="Title-nav">
                <ul>
                        <li><a href="/mypage">My Page </a></li>


                </ul>
                </nav>
            </div>
        </header>
    );
  
}
export default LoginHeader;
