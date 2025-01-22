import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import {Login} from './Login'
import '../'


function Signup(){
    let navigate = useNavigate();
    const [user, setUser] = useState([]);
    
    const [userId, setUserId] = useState("");
    const [pwd, setPwd] = useState("");
    const [nick, setNick] = useState("");
    const [email, setEmail] = useState("");
    const [telNumber, setTelNumber] = useState("");


    useEffect(()=>{
        console.log(user);
    },[user]);

    useEffect(() => {
        console.log("LocalStorage users:", JSON.parse(localStorage.getItem("users")));
    }, [user]);

    function register(e){
        e.preventDefault();
        const newUser = {
            userId,
            pwd,
            nick,
            email,
            telNumber
        };
        const upUsers = [...user,newUser];
        setUser(upUsers)
        
        localStorage.setItem("users",JSON.stringify(upUsers));
        setUserId("");
        setPwd("");
        setNick("");
        setEmail("");
        setTelNumber("");
        alert("회원가입 완료");

        navigate("/login");
        
    }
    return(
        <form>
            <h2>회원가입 페이지</h2>
            <ul>
                <li>
                    <label>아이디 : </label>
                    <input type="text" value = {userId} onChange={(e)=>setUserId(e.target.value)}/>
                </li>
                <li>
                    <label>비밀번호 : </label>
                    <input type="password" value = {pwd} onChange={(e)=>setPwd(e.target.value)} />
                </li>
                <li>
                    <label>닉네임 : </label>
                    <input type="text" value = {nick} onChange={(e)=>setNick(e.target.value)}/>
                </li>
                <li>
                    <label>이메일 : </label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </li>
                <li>
                    <label>전화번호 : </label>
                    <input type="text" value={telNumber} onChange={(e)=>setTelNumber(e.target.value)}/>
                </li>
            </ul>
            <button onClick={register}>회원가입 하기</button>
        </form>
    )
}

export default Signup;