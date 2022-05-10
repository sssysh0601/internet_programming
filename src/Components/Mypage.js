import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Mypage.css';
import Header from "./Header";

function Mypage() {
return (
    <div className="App">
        <Header />
        <div class="wrap">
            <div class="mypage">
                <img id="imgLogin" src="img_mypage.png" alt="login text" />
                <div class="wrap-image">
                <img id="imgUser" src="icon_user.png" alt=""></img>
                </div>
                <div class="mypageContent">
                    <h3>ID : </h3>
                    <h3>게시물 수 : </h3>
                    
                </div>
                <div className="mypage_tablediv">
                  <table className="mypage_board_list text-center" border="1">
                     <colgroup>
                        <col width="5%" />
                        <col width="*" />
                        <col width="50%" />
                        <col width="*" />
                        <col width="*" />
                     </colgroup>
                     <thead>
                        <tr>
                           <th>번호</th>
                           <th>구분</th>
                           <th>제목</th>
                           <th>작성자</th>
                           <th>작성일시</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>공지사항</td>
                           <td className="text-left">
                              <Link to="/">명지NOTICE 이용방법</Link></td>
                           <td>10조</td>
                           <td></td>
                        </tr>
                     </tbody>
                  </table>
                  </div>
            </div>
        </div>
    </div>
)
} export default Mypage;