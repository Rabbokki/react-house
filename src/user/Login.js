import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./styles.css"
import { useState,useEffect } from 'react';

function Login(){
    let navigate = useNavigate();
    
    const [userId, setUserId] = useState("");
    const [pwd, setPwd] = useState("");

    function loginGo(e){
        e.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers.find((user)=>user.userId===userId);


        if(!user){
            alert('아이디가 일치하지 않습니다.');  
        }
        else if (user.pwd !== pwd) {
            alert('비밀번호가 일치하지 않습니다.');
        }else{
            alert('로그인 성공!')
            navigate("/content");

        }
    }
    function registerGo(){
        navigate("/signup");
    }


    return(
        <form>
            <h2>로그인 페이지</h2>
            <ul>
                <li>
                    <label>아이디 : </label>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}/>
                </li>
                <li>
                    <label>비밀번호 : </label>
                    <input type="text" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
                </li>
                
            </ul>
            <button onClick={loginGo}>로그인 하기</button>
            <br />
            <br />
            <button onClick={registerGo}>회원가입 하기</button>
            
        </form>
    )
}

export default Login;