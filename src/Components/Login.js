import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Login.css';
import Header from "./Header";
function Login() {



    const handleChange1 = (e) => {
        setId(e.target.value);
     };
     const handleChange2 = (e) => {
        setPass(e.target.value);
     };

    const [ID, setId] = useState('');
    const [pass, setPass] = useState('');
    const [temppass, setTemppass] = useState('');


    const submituser = () => {            //포스팅 추가 (임시)
        const user = {
           ID: ID,
           pass: pass,
        };
  
        fetch("http://localhost:3001/login", {
           method: "post", // 통신방법
           headers: {
              "content-type": "application/json",
           },
           body: JSON.stringify(user),
        })
           .then((res) => res.json())
           .then((json) => {
            setTemppass(json);
           });
           if(temppass.pass==user.pass){
               alert("로그인성공");
               window.location.replace("/");
           }
           else{
               alert("로그인실패");
           }
     };


    return ( 
        <div className="App">
            <Header />
        <div class="wrap">
            <div class="content">
                <div class="login">
                    <div class="wrapImg">
                        <img id="imgLogin" src="img_login.png" alt="login text" />
                    </div>
                    <div class="login_id">
                        <h4>ID</h4>
                        <input onChange={handleChange1} type="ID" placeholder="ID" />
                    </div>
                    <div class="login_pw">
                        <h4>Password</h4>
                        <input onChange={handleChange2} type="password"placeholder="Password" />
                    </div>
                    <div class="submit">
                        <input type="submit" value="submit" onClick={submituser}/>
                    </div>
                    <h5>Do you want sign up?<Link to="/signup">sign up</Link></h5>
                </div>
            </div>
        </div>
        </div>
)
}export default Login;

