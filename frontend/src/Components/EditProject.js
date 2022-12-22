import React ,{useState, useEffect}from "react";
import {useParams, useNavigate} from 'react-router-dom'
import Moment from 'moment'
import {getProject, editProject} from '../Apicalls/ProjectAPI'
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
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const animatedComponents = makeAnimated();

const EditProject=()=>{
    const[project, setProject]= useState({
      
      "name": "",
      "startDate": "",
      "endDate": "",
      "technology": "",
      "nfRequirement": "",
      "fRequirement":"",
      "budget": 0,
      "client": {},
      "teams": [],
      "status":""      
    
    });
    const [selectedOption, setSelectedOption] = useState(null);
    const[teams, setTeams]= useState([]);
    const[dropItems, setDropItems]= useState([]);
    const[showSd, setShowSd]= useState(true);
    const[showED, setShowED]= useState(true);

    const user =  JSON.parse(localStorage.getItem('user-info'));
    const {id}= useParams();
    const navigate = useNavigate();

    const handleChange=name=>(event)=>{
        setProject({...project,[name]:event.target.value})
     }
  const handleChangeDropdown = e => {
      setSelectedOption(e);
  }

    const EditProject=()=>{

      if(project.name===""|| project.startDate===""|| project.endDate==="" ||
      project.budget===""|| project.technology===""|| project.fRequirement===""
      ||project.nfRequirement==="" || project.status == "")
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
            for(var i=0;i<project.teams.length;i++){
              teamIds = teamIds+project.teams[i].id+","
            }
            teamIds = teamIds.slice(0,-1);

      
     editProject(id,project, teamIds,user.token)
     .then(res=>{
      toast.success("Saved successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
        setTimeout(()=>{
          navigate(`/admin/projects`);
        }, 3000);
     })
    }

    const loadProject=()=>{
        getProject(id, user.token)
        .then(res=>{         
           setProject(res[0]);
          });      
     }
   
 

  const loadSelectedOptions= async()=>{
    await fetch(`http://localhost:44327/api/Team/team-under-project/${id}`,{                    
    })
    .then(res=>res.json())
    .then(res=>{
      const temp= 
      [
      ];
      var t = [...dropItems];
    for(var i=0;i<res.length;i++)
    {
      const obj={label:'', Id:0, value:0};
      obj.label = res[i].name;
      obj.Id = res[i].id;
      obj.value = i;
      temp.push(obj);
      t.push(obj);
    }
    
    
    setDropItems(t);
    setSelectedOption(temp);
    })
  }

  useEffect(()=>{
    loadProject();
  // loadSelectedOptions();
  },[])

     return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='5' className='my-5'>
    
              <h1 class="text-black mb-4">Edit Project</h1>
    
              <MDBCard>
                <MDBCardBody className='px-4'>
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Name</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg' value={project.name.split("T")[0]} type='text' onChange={handleChange("name")}/>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Start Date</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                    {
                        showSd ?(
                            <div>
                            <p className="text-muted">{project.startDate.split("T")[0]}</p>
                            <button className="btn btn-sm text-muted" onClick={()=>{setShowSd(false)}}>change</button>
                            </div>
                        ):(
                            
                               
                              <input type="date" value={project.startDate} onChange={handleChange("startDate")}></input>
                              
                        )      
                                                      
                    }
                      
                    </MDBCol>
    
                  </MDBRow>

                  
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">End Date</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                    {
                        showED ?(
                            <div>
                            <p className="text-muted">{project.endDate.split("T")[0]}</p>
                            <button className="btn btn-sm text-muted" onClick={()=>{setShowED(false)}}>change</button>
                            </div>
                        ):(
                                                
                              <input type="date" value={project.endDate} onChange={handleChange("endDate")}></input>
                              
                        )      
                                                      
                    }
                    {/* <input type="date" value={project.endDate} onChange={handleChange("endDate")}></input> */}
                    </MDBCol>
    
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Budget</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='number' value={project.budget} onChange={handleChange("budget")}/>
                    </MDBCol>

                 </MDBRow>
                 <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Technology</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea  size='lg' value={project.technology}  onChange={handleChange("technology")}/>
                    </MDBCol>

                </MDBRow>
                <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Functional requirement</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea  size='lg' value={project.fRequirement}  onChange={handleChange("fRequirement")}/>
                    </MDBCol>

                </MDBRow>
    
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Non Functional requirement</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea  size='lg' value={project.nfRequirement}  onChange={handleChange("nfRequirement")}/>
                    </MDBCol>
                </MDBRow>
    
                  {/* <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Edit Teams</h6>
                    </MDBCol> 
                    <MDBCol md='9' className='pe-5'>
                    <Select options={dropItems} components={animatedComponents}
                        placeholder="select teams.."
                        value={selectedOption} 
                        onChange={handleChangeDropdown}
                        isMulti />
                    </MDBCol>
                       
                  </MDBRow> */}
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
    <MDBCol md='3' className='ps-5'>
      <h6 className="mb-0">Status</h6>
    </MDBCol>

    
    <MDBCol md='9' className='pe-5'>
                    {/* <MDBInput  size='lg'  type='text' value={employee.designation} onChange={handleChange("designation")}/> */}
                    <select onChange={handleChange("status")}>
                        <option >Select..</option>
                        <option value="Active">Active</option>
                        <option value="On hold" >On hold</option>
                        <option value="Cancelled" >Cancelled</option>
                        <option value="Completed" >Completed</option>
                       
                    </select>
    </MDBCol>
    

  </MDBRow>
    
                  <button className='btn btn-lg btn-primary mr-3'  onClick={EditProject}>Save</button>
                  <button className='btn btn-lg btn-secondary'  onClick={()=>{navigate(`/admin/projects`)}}>Cancel</button>
                  
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
          
          
          <ToastContainer />
        </MDBContainer>
      );
}

export default EditProject;