import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


 function Protected(props) {
    
    let Cmp = props.Cmp

 const navigate = useNavigate();

useEffect(() =>{
    let user_info = localStorage.getItem('user-info');
    if(!(user_info))
    {
        navigate("/login");
    }
   

}, [])





return (
    <div>
        <Cmp/>
    </div>
)

 }

export default Protected