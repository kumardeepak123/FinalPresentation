import React,{useState}from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import {createTeam} from '../Apicalls/TeamAPI'
import {getEmployee} from '../Apicalls/EmployeeAPI'

const animatedComponents = makeAnimated();

const CreateTeam=()=>{
    const[team, setTeam]= useState({
        "name":""
    })
   
    const navigate = useNavigate();
    const user =  JSON.parse(localStorage.getItem('user-info'));
    const[employees, setEmployees]= useState(
        []
    );
    
    const handleChangeDropdown = e => {
        setSelectedOption(e);
    }
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange=name=>(event)=>{  
        setTeam({...team,[name]:event.target.value})
    }
    
    useEffect(()=>{
          getEmployee(null,user.token)
         .then(res=>{
            
            var emp = {};
            var emps=[]
            for(var i=0;i< res.length;i++)
            {
                
                emp= {label: res[i].name+" ("+res[i].designation+")", value: i, Id: res[i].id};
                emps.push(emp);
            }
            
            setEmployees(emps);
            
         })
    },[])

    const createTeamm=()=>{
        if(!validateInputs())return;
        var employeeIds="";
        for(var i=0;i<selectedOption.length;i++){
            employeeIds = employeeIds+selectedOption[i].Id+","
        }
        employeeIds = employeeIds.slice(0,-1);
        // alert(JSON.stringify(employeeIds));
        // return;

         createTeam(team,employeeIds, user.token)
         .then(res=>{
            toast.success("Team created successfully !", {
                position: toast.POSITION.TOP_RIGHT
              });
              setTeam({...team,"name":""});
              setSelectedOption(null);
         })
         .catch(err=>console.log(err));
       
    }

    const validateInputs=()=>{
        if(team.name === "" ){
            toast.error("Please fill the name", {
                position: toast.POSITION.TOP_RIGHT
              });
            return false;
        }
        if(team.name.length <5 ){
            toast.error("Team name should be at least five characters", {
                position: toast.POSITION.TOP_RIGHT
              });
            return false;
        }
        if(selectedOption === null){
            toast.error("Please select employees", {
                position: toast.POSITION.TOP_RIGHT
              });
            return false;
        }
        return true;
    }

    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='5' className='my-5'>
    
              <h1 class="text-black mb-4">Create Team</h1>
    
              <MDBCard>
                <MDBCardBody className='px-4'>
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Name</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='text' value={team.name} onChange={handleChange("name")}/>
                    </MDBCol>
    
                  </MDBRow>
                
    
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Select Employees</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                    <Select options={employees} components={animatedComponents}
                        placeholder="Select employess.."
                        value={selectedOption} 
                        onChange={handleChangeDropdown}
                        isMulti />

                    </MDBCol>
    
                  </MDBRow>
    
                  <button className='btn btn-lg btn-primary mr-3' onClick={createTeamm}>Create</button>
                  <button className='btn btn-lg btn-secondary'  onClick={()=>{navigate("/admin/manage-teams")}}>Back</button>
                </MDBCardBody>
                
              </MDBCard>
              
            </MDBCol>
          </MDBRow>
          <ToastContainer />
        </MDBContainer>
      );
    
    
}

export  default CreateTeam;