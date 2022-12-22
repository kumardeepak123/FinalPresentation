import React, { useState } from 'react'

const Child=(props)=>{
    
    const [num, setNum]= useState(0);
    
    const increase =(e)=>{
        
        setNum(num+1);
        props.callbackFunc(num);
        
    }

    return(
        <div>
            Inner {num}
            <br/>
            <button onClick={increase}>Increase</button>
        </div>
    )
}

export default Child;