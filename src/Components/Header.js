import React,{Component} from "react";
import './Header.css';
import imgTitle from '../image/img_title.png'

class Header extends Component{
    render(){
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
                        <li><a href="#">My Page </a></li>
                        <li className="Login-text"><a href="#">Log in</a></li>
                        <li className="Join-text"><a href="#">Sign up</a></li>

                </ul>
                </nav>
            </div>
        </header>
    );
  }
}
export default Header;
