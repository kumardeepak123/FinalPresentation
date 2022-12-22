import React ,{useEffect, useState}from "react";
import {useNavigate} from 'react-router-dom'
import {getTeamsWithNoProject}  from '../Apicalls/TeamAPI'
import {createProject}  from '../Apicalls/ProjectAPI'
import {
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
import Moment from 'moment';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const animatedComponents = makeAnimated();

const CreateProject=()=>{

    const[project, setProject]= useState({
        
        "name": "",
        "startDate": "",
        "endDate": "",
        "technology": "",
        "fRequirement": "",
        "nfRequirement": "",
        "budget": 0,
        "status":"Active"
       
    });
   const[teams, setTeams]= useState([]);
   const [selectedOption, setSelectedOption] = useState(null);

    const user =  JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();

    const handleChange=name=>(event)=>{
       setProject({...project,[name]:event.target.value})
    }
   
    const handleChangeDropdown = e => {
      setSelectedOption(e);
    }

    const loadTeams=()=>{
      getTeamsWithNoProject(user.token)
     .then(res=>{
        
      const temp= 
      [
      ];

    for(var i=0;i<res.length;i++)
    {
      const obj={label:'', Id:0, value:0};
      obj.label = res[i].name;
      obj.Id = res[i].id;
      obj.value = i;
      temp.push(obj);
    }
    setTeams(temp);
        
     })
    }
    useEffect(()=>{
      loadTeams();
    },[])

    const addProject=()=>{
        if(project.name===""|| project.startDate===""|| project.endDate==="" ||
        project.budget===""|| project.technology===""|| project.fRequirement===""
        ||project.nfRequirement==="" || selectedOption === null)
        {
          toast.error("Please include all the fields", {
            position: toast.POSITION.TOP_RIGHT
          });
            return;
        }
        
        const sDate = Moment(project.startDate).format('YYYY-MM-DD');
        const eDate = Moment(project.endDate).format('YYYY-MM-DD');
        if(eDate<=sDate){
          toast.error("End date should be greater than start date", {
            position: toast.POSITION.TOP_RIGHT
          });
            return;
        }

        var teamIds ="";
        for(var i=0;i<selectedOption.length;i++){
          teamIds = teamIds+selectedOption[i].Id+","
        }
        teamIds = teamIds.slice(0,-1);
        
        
       

        createProject(project, teamIds, user.token)
        .then(res=>{
          toast.success("Created successfully", {
            position: toast.POSITION.TOP_RIGHT
          });        
            setProject({});
            setTimeout(()=>{
              navigate(`/admin/projects`);
            },3000);
        })
    }

    
    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='5' className='my-5'>
    
              <h1 class="text-black mb-4">Create Project</h1>
    
              <MDBCard>
                <MDBCardBody className='px-4'>
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Name</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='text' onChange={handleChange("name")}/>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Start Date</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <input type="date" onChange={handleChange("startDate")}></input>
                    </MDBCol>
    
                  </MDBRow>

                  
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">End Date</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                    <input type="date" onChange={handleChange("endDate")}></input>
                    </MDBCol>
    
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Budget</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='number' onChange={handleChange("budget")}/>
                    </MDBCol>

                 </MDBRow>
                 <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Technology</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea  size='lg'   onChange={handleChange("technology")}/>
                    </MDBCol>

                </MDBRow>
                <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Functional requirement</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea  size='lg'   onChange={handleChange("fRequirement")}/>
                    </MDBCol>

                </MDBRow>
    
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Non Functional requirement</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea  size='lg'   onChange={handleChange("nfRequirement")}/>
                    </MDBCol>
                </MDBRow>
    
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Select Teams</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>

                    <Select options={teams} components={animatedComponents}
                        placeholder="Select teams.."
                        value={selectedOption} 
                        onChange={handleChangeDropdown}
                        isMulti />

                    </MDBCol>
    
                  </MDBRow>

    
                  <button className='btn btn-lg btn-primary mr-3'  onClick={addProject}>Create</button>
                  <button className='btn btn-lg btn-secondary'  onClick={()=>{navigate(`/admin/projects`)}}>Back</button>
    
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
          <ToastContainer />
        </MDBContainer>
      );
}

export default CreateProject;