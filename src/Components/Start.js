import React, { useState, useEffect } from "react";
import './Footer.css';
import Header from "./Header";
import Contents from "./contents";
import Footer from "./Footer";
import Logincontent from "./Logincontent";
import LoginHeader from "./LoginHeader";

function Start(){
  const [isLogin, setIsLogin] = useState(false)
 
  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin)
    } else {
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin ?? :: ', isLogin)
    }
  })

    return (
        <div className="App">
     
        {isLogin? 
        <><LoginHeader /><Logincontent isLogin={isLogin} /></> 
        :
        <><Header /><Contents /></>
}
        <Footer />
      </div>
    )
    
}
export default Start;