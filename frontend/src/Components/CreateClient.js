import React, {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast, ToastContainer } from 'react-toastify';
import {getProjectsForAssignmentToClient,createClient} from '../Apicalls/ClientAPI'
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
  
const animatedComponents = makeAnimated();
const CreateClient=()=>{
    const[client, setClient]= useState({
       
        "name": "",
        "email": "",
        "password": "",
        "phone": "",
        "organization": "",
        "role": "Client",
        "profileImageFile": null,// new formDat()
        "agreementPaperFile": null
    });

    const[projects, setProjects]= useState([]);
    const [projectIds, setProjectIds]= useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const[dropdownItem, setDropdownItem]= useState([]);
    const handleChangeDropdown = e => {
        setSelectedOption(e);
    }
    
    
    const user =  JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();

    const handleChange=name=>(event)=>{
        
        if(name === "profileImageFile" || name === "agreementPaperFile"){
            setClient({...client,[name]:event.target.files[0]})
            return;
        }
        setClient({...client,[name]:event.target.value})
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
            obj.value = i;
            temp.push(obj);
          }
          setProjects(temp);
          //alert(temp[0].label+""+temp[0].Id);
          // setDropdownItem([...temp]);
          })
          

    }
    useEffect(()=>{
      loadProjects();  
    },[])

    const addClient=()=>{
        // alert(JSON.stringify(client));
         if(client.name==="" || client.email===""|| client.password===""||
         client.phone===""|| client.organization===""||
         client.agreementPaperFile==null ||
         client.profileImageFile==null)
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
         var afileExtn=client.agreementPaperFile.name.split(".").pop()
         if(afileExtn !== 'pdf'){
          toast.error("Please select pdf only", {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
         }

         var pfileExtn=client.profileImageFile.name.split(".").pop()
         if(pfileExtn !== 'png' && pfileExtn!=='jpeg' && pfileExtn!=='jpg'){
          toast.error("Please select .png or .jpeg", {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
         }

         if(client.password.length<5){
          toast.error("password should be minimum 5 characters", {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
         }

         if(selectedOption.length == 0)
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
         formData.append("ProfileImageFile", client.profileImageFile);
         formData.append("AgreementPaperFile", client.agreementPaperFile);
         var projectIdsParams ="";
         
         for(var i=0;i<selectedOption.length;i++)
         {        
          projectIdsParams = projectIdsParams+ selectedOption[i].Id+",";         
         }
         projectIdsParams =projectIdsParams.slice(0,-1);
         //setProjectIds(projectIdsParams);
         
         //alert(projectIdsParams);
         
          
        //   setClient({
        //     "id": 2,
        //     "name": "",
        //     "email": "",
        //     "password": "",
        //     "phone": "",
        //     "organization": "",
        //     "role": "Client",
        //     "profileImageFile": null,
        //     "agreementPaperFile": null
        // });
        // setSelectedOption(null);

        // navigate(`/admin/handle/clients`);
        // return; //BP

        createClient(user.token, projectIdsParams, formData)
         .then(res=>{
            
          toast.success("Client created successfully !", {
            position: toast.POSITION.TOP_RIGHT
          });
          setTimeout(() => {
            navigate('/admin/handle/clients')
          }, 5000)
         })
    }
    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='5' className='my-5'>
    
              <h1 class="text-black mb-4">Create Client</h1>
    
              <MDBCard>
                <MDBCardBody className='px-4'>
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Name</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='text' value={client.name} onChange={handleChange("name")}/>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Email address</h6>
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
                    <MDBInput  size='lg'  type='text' value={client.organization}  onChange={handleChange("organization")}/>
                    </MDBCol>

                </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Upload Agreement paper</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBFile size='lg'  onChange={handleChange("agreementPaperFile")}/>
                      <div className="small text-muted mt-2">only .pdf files</div>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Upload Profile photo</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBFile size='lg'  onChange={handleChange("profileImageFile")}/>
                      <div className="small text-muted mt-2">select .png, .jpeg etc</div>
                    </MDBCol>
    
                  </MDBRow>

    
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Assign Projects</h6>
                    </MDBCol>
                    <MDBCol md='9' className='pe-5'>
                    <Select options={projects} components={animatedComponents}
                    placeholder="Select.."
                    defaultValue={selectedOption} 
                    onChange={handleChangeDropdown}
                    isMulti />
                    </MDBCol>
                  </MDBRow>
                    
                  
                  <button className='btn btn-lg btn-primary mr-3'  onClick={addClient}>Create</button>
                  <button className='btn btn-lg btn-secondary'  onClick={()=>{navigate(`/admin/handle/clients`)}}>Cancel</button>
                </MDBCardBody>
                
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
          {/* {selectedOption && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <b>Selected Options</b><br />
        <pre>{JSON.stringify(selectedOption, null, 2)}</pre>
      </div>} */}
      <ToastContainer />
        </MDBContainer>
      );
    

}

export default CreateClient;