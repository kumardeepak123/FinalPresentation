import React, {useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom'
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
  import {getClient, getProjectsUnderClient, editClient, getProjectsForAssignmentToClient} from '../Apicalls/ClientAPI'
  import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
  import Select from 'react-select';
  import makeAnimated from 'react-select/animated';
  const animatedComponents = makeAnimated();

const EditClient=()=>{
    const[client, setClient]= useState({    
        "name": "",
        "email": "",
        "password": "",
        "phone": "",
        "organization": "",
        "profileImageName": "",
        "agreementPaperName": "",
        "role": "Client",
        "projects": null,
        "profileImageFile": null,
        "profileImageSrc": "",
        "agreementPaperFile": null,
        "agreementPaperSrc": ""
    });
    const[projects, setProjects]= useState([]);
    const[projectId, setProjectId]= useState(0);
    const[projectInfo, setProjectInfo]= useState(
        {
            "id": 2,
            "name": "",
            "startDate": "",
            "endDate": "",
            "technology": "",
            "fRequirement": "",
            "nfRequirement": "",
            "budget": 0,
            "_Client": null,
            "clientId": 0
        }
    );
    const [selectedOption, setSelectedOption] = useState([]);//

    const user =  JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const {id} = useParams();

    const loadAdminInfo= async()=>{      
        getClient(id, user.token,"","","")
        .then(res=>{
           setClient(res[0]);          
        })
        .catch(err=>console.log(err));
    }
    
    const handleChangeDropdown = e => {
      setSelectedOption(e);
  }
  const loadProjects=()=>{
        getProjectsForAssignmentToClient(user.token)
        .then(res=>{
          
          const temp= 
          [
          ];
          
        
        for(var i=0;i<res.length;i++)
        {
          const obj={label:'', Id:0, value:0};
          obj.label = res[i].name;
          obj.Id = res[i].id;
          obj.value = i+100;
          temp.push(obj);
          
        }
        
        setProjects(temp);
        loadAssignedProjects();
        
        })
        
  }

  const loadAssignedProjects=()=>{
        getProjectsUnderClient(id, user.token)
        .then(res=>{
          
          const temp= 
          [
          ];
        //let projs= [...projects];
        for(var i=0;i<res.length;i++)
        {
          const obj={label:'', Id:0, value:0};
          obj.label = res[i].name;
          obj.Id = res[i].id;
          obj.value = i+150;
          temp.push(obj);
          //projs.push(obj);
        }
        
        //alert(projs[0].label+" "+projs[1].label)
       // setProjects(projs);       
        setSelectedOption(temp);
        
        })
  }


    useEffect(()=>{
        loadAdminInfo(); 
        //loadProjects();                
        loadAssignedProjects();
        
     },[])

    const handleChange=name=>(event)=>{
        if(name === "profileImageFile" || name === "agreementPaperFile"){
            setClient({...client,[name]:event.target.files[0]})
            return;
        }

        if(name === "assignProject"){
            setProjectId(event.target.value);
            return;
        }

        setClient({...client,[name]:event.target.value})
    }
   
    const EditClientHandle= (e)=>{
      if(client.name==="" || client.email===""|| client.password===""||
         client.phone===""|| client.organization===""
         )
         {
          toast.error("Please include all the fields", {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
         }

      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(client.email))
      {
        toast.error("Invalid email address", {
          position: toast.POSITION.TOP_RIGHT
        });
       return;
      }
      if(client.password.length<5){
        toast.error("Password should be minimum of five characters", {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
       }
      if(selectedOption.length === 0)
      {
        toast.error("Please select at least one project", {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      
      
            const  formData =  new FormData();
            formData.append("Id", 2);
            formData.append("Name", client.name);
            formData.append("Email", client.email);
            formData.append("Password", client.password);
            formData.append("Phone", client.phone);
            formData.append("Organization", client.organization);
            formData.append("Role", client.role);
            formData.append("ProfileImageName", client.profileImageName);
            formData.append("AgreementPaperName", client.agreementPaperName);
            formData.append("ProfileImageSrc", client.profileImageSrc);
            formData.append("AgreementPaperSrc", client.agreementPaperSrc);
            formData.append("ProfileImageFile", client.profileImageFile);
            formData.append("AgreementPaperFile", client.agreementPaperFile);
            var projectIds ="";
            for(var i=0;i<selectedOption.length;i++){
              projectIds = projectIds+selectedOption[i].Id+","
            }
            projectIds = projectIds.slice(0,-1);

            
         
         editClient(id,formData,user.token,projectIds)
         .then(res=>{
            
          toast.success("Details saved successfully !", {
            position: toast.POSITION.TOP_RIGHT
          });

          setTimeout(()=>{
            navigate(`/admin/handle/clients`);
          },5000)
         })

    }

    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='5' className='my-5'>
    
              <h1 class="text-black mb-4">Edit Client</h1>
    
              <MDBCard>
                <MDBCardBody className='px-4'>
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Name</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg' value={client.name} type='text' onChange={handleChange("name")}/>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0"  >Email address</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='email' value={client.email} onChange={handleChange("email")}/>
                    </MDBCol>
    
                  </MDBRow>

                  
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Password</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='password' value={client.password} onChange={handleChange("password")}/>
                    </MDBCol>
    
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Phone</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='text' value={client.phone} onChange={handleChange("phone")}/>
                    </MDBCol>

                 </MDBRow>
                 <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Organization</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='text' value={client.organization} onChange={handleChange("organization")}/>
                    </MDBCol>

                </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Edit Agreement paper</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBFile size='lg'  onChange={handleChange("agreementPaperFile")}/>
                      <div className="small text-muted mt-2">only .pdf files</div>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Edit Profile photo</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBFile size='lg'    onChange={handleChange("profileImageFile")}/>
                      <div className="small text-muted mt-2">select .png, .jpeg etc</div>
                    </MDBCol>
    
                  </MDBRow>

                  {/* <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Edit Projects</h6>
                    </MDBCol> 
                    <MDBCol md='9' className='pe-5'>
                    <Select options={projects} components={animatedComponents}
                        placeholder="select projects.."
                        value={selectedOption} 
                        onChange={handleChangeDropdown}
                        isMulti />
                    </MDBCol>
                       
                  </MDBRow> */}
                  
                    

                  <hr className="mx-n3" />
    
                  <button className='btn btn-lg btn-primary mr-3'  onClick={EditClientHandle}>Save</button>
                  <button className='btn btn-lg btn-secondary'  onClick={()=>{navigate(`/admin/handle/clients`)}}>Cancel</button>
                  
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
        <ToastContainer />
        </MDBContainer>
      );
    

}

export default EditClient;