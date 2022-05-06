import React,{Component} from "react";
import {Link} from 'react-router-dom';
import './Header.css';

function Header(props){

    return (
        <header className="Header">
            <div className= "Title-contents">
            <div className="Logo">
               <span className="Logo-text">명지NOTICE</span>
            </div>
                <nav className="Title-nav">
                <ul>
                <li className="Login-text"><Link to="/login">글쓰기</Link></li>
                        <li className="Join-text"><Link to="/signup">회원가입</Link></li>

                </ul>
                </nav>
            </div>
        </header>
    );
  
}
export default Header;
