import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Signup.css';
import Header from "./Header";
function Signup() {
    const handleChange1 = (e) => {
        setId(e.target.value);
    };
    const handleChange2 = (e) => {
        setPass(e.target.value);
    };
    const handleChange3 = (e) => {
        setTemppass(e.target.value);
    };

    const [ID, setId] = useState('');
    const [pass, setPass] = useState('');
    const [temppass, setTemppass] = useState('');
    const [user, setUser] = useState([]);

    const submitSignup = () => {            //포스팅 추가 (임시)
        const user = {
            ID: ID,
            pass: pass,
        };

        fetch("http://localhost:3001/signup", {
            method: "post", // 통신방법
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((json) => {
                setUser(json);
            });

    };
    return (
        <div className="App">
            <Header />
            <div class="wrap">
                <div class="content">
                    <div class="signup">
                        <div class="wrapImg">
                            <img id="imgLogin" src="img_signup.png" alt="login text" />
                        </div>
                        <div class="sign_id">
                            <h4>ID</h4>
                            <input onChange={handleChange1} type="ID" placeholder="ID" />
                        </div>
                        <div class="sign_pw">
                            <h4>Password</h4>
                            <input onChange={handleChange2} placeholder="Password" />
                        </div>
                        <div class="sign_pw">
                            <h4>reconfirm password</h4>
                            <input onChange={handleChange3} placeholder="reconfirm Password" />
                        </div>
                      
                        <div class="submit">
                        {pass == temppass ?
                            <> {pass === '' ?
                            <>
                            <span>비밀번호를 입력해주세요.</span><input type="submit" disabled={false} value="submit" onClick={submitSignup} />
                            </>
                            :
                            <>
                            <span>비밀번호가 일치합니다.</span><input type="submit" disabled={false} value="submit" onClick={submitSignup} />
                            </>
                            }
                            </>
                                
                                : 
                                <><span>비밀번호가 일치하지 않습니다.</span><input type="submit" disabled={true} value="submit" /></>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} export default Signup;