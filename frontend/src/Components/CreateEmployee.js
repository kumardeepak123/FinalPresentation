import React, {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBFile
  }
  from 'mdb-react-ui-kit';
import {createEmployee} from '../Apicalls/EmployeeAPI'
const animatedComponents = makeAnimated(); 

const CreateEmployee=()=>{
    const[employee, setEmployee]= useState(
        {      
            "name": "",
            "email": "",
            "password": "",
            "phone": "",
            "designation": "",
            "role":"Employee"
        }
    );


    
    const navigate = useNavigate();
    const user =  JSON.parse(localStorage.getItem('user-info'));
    const handleChange=name=>(event)=>{
        setEmployee({...employee,[name]:event.target.value})
    }
    
 
    const addEmployee=()=>{
         if(employee.name==="" || employee.email===""|| employee.password===""||
         employee.phone==="" || employee.designation==="")
         {
            toast.error("Please include all the fields", {
                position: toast.POSITION.TOP_RIGHT
              });
          return;
         }
         if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(employee.email))
       {
        toast.error("Invalid email address", {
            position: toast.POSITION.TOP_RIGHT
          });
        return;
       }
 
         if(employee.password.length<5){
          toast.error("Password should be minimum of 5 characters", {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
         }
         
         if(employee.phone.length!=10){
            toast.error("Phone number should be 10 characters", {
              position: toast.POSITION.TOP_RIGHT
            });
            return;
           }
         
       
        createEmployee(employee,user.token)
         .then(res=>{
            
            toast.success("Employee created successfully !", {
                position: toast.POSITION.TOP_RIGHT
              });
            setEmployee({
            
                "name": "",
                "email": "",
                "password": "",
                "phone": "",
                "designation": ""
              });
            //navigate("/admin/handle/clients");
         })
    }

    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='5' className='my-5'>
    
              <h1 class="text-black mb-4">Create Employee</h1>
    
              <MDBCard>
                <MDBCardBody className='px-4'>
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Name</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='text' value={employee.name} onChange={handleChange("name")}/>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Email address</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='email' value={employee.email} onChange={handleChange("email")}/>
                    </MDBCol>
    
                  </MDBRow>

                  
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Password</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='password' value={employee.password} onChange={handleChange("password")}/>
                    </MDBCol>
    
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Phone</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='text' value={employee.phone}  onChange={handleChange("phone")}/>
                    </MDBCol>

                 </MDBRow>
                 <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Designation</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    {/* <MDBInput  size='lg'  type='text' value={employee.designation} onChange={handleChange("designation")}/> */}
                    <select onChange={handleChange("designation")}>
                        <option >Select..</option>
                        <option value="Project Lead">Project Lead</option>
                        <option value="Frontend Developer" >Frontend Developer</option>
                        <option value="Backend Developer" >Backend Developer</option>
                        <option value="Tester" >Tester</option>
                        <option value="Data Analyst" >Data Analyst</option>
                        <option value="UI Designer" >UI Designer</option>
                    </select>
                    </MDBCol>

                </MDBRow>
    
                  <hr className="mx-n3" />

                  <button className='btn btn-lg btn-primary mr-3'  onClick={addEmployee}>Create</button>
                  <button className='btn btn-lg btn-secondary'  onClick={()=>{navigate(`/admin/manage-teams`)}}>Back</button>
                </MDBCardBody>
                
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
          <ToastContainer />
        </MDBContainer>
      );
    

}

export default CreateEmployee;