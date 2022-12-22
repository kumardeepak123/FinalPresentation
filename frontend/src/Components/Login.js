import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import {json, useNavigate} from 'react-router-dom';
import  {signin} from '../Apicalls/AuthAPI'

  
function Login (){

    const[email,setEmail]= useState("");
    const[password,setPassword]= useState("");
    const[role, setRole]= useState("Admin")
    const[error, setError]= useState(false);
    const[errorMessage, setErrorMessage]= useState("");
    const handleChange=name=>(event)=>{
      
       if(name ==='email'){
        
        setEmail(event.target.value);
        
        return;
       }
       if(name ==='password'){
        setPassword(event.target.value);
       }
    }
    
    const navigate = useNavigate();
    const  handleLogin=async ()=>{
      
       if(email ===''){
        setError(true);
        setErrorMessage('Please enter email');
        return;
       }
       
       if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
       {
        setError(true);
        setErrorMessage('Invalid email address');
        return;
       }
       if(password ===''){
        setError(true);
        setErrorMessage('Please enter password');
        return;
       }
       if(password.length<5){
        setError(true);
        setErrorMessage('password should be minimum of 5 characters');
        return;
       }

       setError(false);
       setErrorMessage('');
       
      signin(email,password,role)
      .then(res=>{
            
            if(res.token)
            {
              
                  localStorage.setItem("user-info", JSON.stringify(res));
                let user = JSON.parse(localStorage.getItem("user-info"));
                
                if(user.role === "Admin"){
                navigate(`/admin/dashboard/${user.id}`);
                }
                else if(user.role == "Client"){
                navigate(`/client/dashboard/${user.id}`);
                }
            }else{
                
                setError(true);
                setErrorMessage("Invalid Credentials");
            }
      })
      
      
            
      
       

      // var res =  await fetch("http://localhost:44327/api/Admin/admin-signin?email="+email+"&password="+password,{
        
      //   method:"POST",
      //   headers:{
      //     "Content-Type":"application/json",
          
          
      //   }
      //  })
      //  .then(res=> res.json())
      //  .then(res=>{
      //   if(!res.token){
      //     setError(true);
      //     setErrorMessage("Invalid Credentials");
      //     return;
      //   }
      //   else{
      //     localStorage.setItem("user-info", JSON.stringify(res));
      //     let user = JSON.parse(localStorage.getItem("user-info"));
         
      //     if(user.role === "Admin"){
      //      navigate(`/admin/dashboard/${user.userId}`);
      //     }
      //     else if(user.role == "Client"){
      //      navigate(`/client/dashboard/${user.userId}`);
      //     }
      //   }

      //  })
       

    }

    return (
      <MDBContainer className="my-5">
  
        <MDBCard style={{backgroundColor:"rgb(194 194 192)"}}>
          <MDBRow className='g-0' >
  
          <MDBCol col='10' md='6'>
          <img src="http://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>
  
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column' >
  
                <div className='d-flex flex-row mt-2'>
                  {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/> */}
                  <span className="h1 fw-bold mb-0">Login</span>
                </div>
  
                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
  
               <MDBInput onChange={handleChange('email')} wrapperClass='mb-4' label='Enter Email Id' id='formControlLg' type='text' size="lg" />
               <MDBInput onChange={handleChange('password')} wrapperClass='mb-4' label='Enter Password' id='formControlLg' type='password' size="lg" />              
  
                
                <button className='btn btn-lg ' style={{backgroundColor:'#29ae7d'}} onClick={handleLogin} >Login</button>
                {error && <div style={{textAlign:'center'}}>
                <b style={{color:'red'}}>{errorMessage}</b>
                </div>}
                
  
              </MDBCardBody>
            </MDBCol>
  
          </MDBRow>
        </MDBCard>
  
      </MDBContainer>
    );
  }
  
  export default Login;