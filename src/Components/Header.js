import React,{Component} from "react";
import './Header.css';

class Header extends Component{
    render(){
    return (
        <header className="Header">
            <div className= "Title-contents">
            <div className="Logo">
               <span className="Logo-text">명지NOTICE</span>
            </div>
                <nav className="Title-nav">
                <ul>
                        <li><a href="#">MyPage</a></li>
                        <li className="Login-text"><a href="#">로그인</a></li>
                        <li className="Join-text"><a href="#">회원가입</a></li>

                </ul>
                </nav>
            </div>
        </header>
    );
  }
}
export default Header;
