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
  
const EditAdmin=()=>{
    const[client, setClient]= useState({
        "id": 2,
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
    

    const user =  JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const {id} = useParams();

    const loadAdminInfo= async()=>{
        
        await fetch(`http://localhost:44327/api/Client/client-details/${id}`,{
           headers:{
               "Authorization" : `Bearer ${user.token}`
           }
        })
        .then(res=> res.json())
        .then(res=>{
           setClient(res);
           
        })
        .catch(err=>console.log(err));
    }

    


    useEffect(()=>{
        loadAdminInfo();
        
     },[])

    const handleChange=name=>(event)=>{
        if(name === "profileImageFile" || name === "agreementPaperFile"){
            setClient({...client,[name]:event.target.files[0]})
            return;
        }

        setClient({...client,[name]:event.target.value})
    }
   
    const EditClientHandle= (e)=>{
      if(client.name==="" || client.email===""|| client.password===""||
         client.phone===""|| client.organization===""
         )
         {
          alert("Please include all the fields");
          return;
         }

      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(client.email))
      {
       alert("Invalid email address");
       return;
      }
      if(client.password.length<5){
        alert("Password should be minimum of 5 characters");
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
            fetch(`http://localhost:44327/api/Client/update-client/${client.id}`,{
            method:'PUT',
            headers:{
                "Authorization" : `Bearer ${user.token}`,
                // "Content-Type": "multipart/form-data"
            },
            body: formData
         })
         .then(res=>res.json())
         .then(res=>{
            alert("Updated successfully");
            navigate(`/admin/profile`);
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
                      <h6 className="mb-0">Change Profile photo</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBFile size='lg'    onChange={handleChange("profileImageFile")}/>
                      <div className="small text-muted mt-2">select .png, .jpeg etc</div>
                    </MDBCol>
    
                  </MDBRow>

                  
                  <hr className="mx-n3" />
    
                  <button className='btn btn-lg btn-primary mr-3'  onClick={EditClientHandle}>Edit</button>
                  <button className='btn btn-lg btn-secondary'  onClick={()=>{navigate(`/admin/profile`)}}>Cancel</button>
                  
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
    

}

export default EditAdmin;