import React,{useEffect, useState}from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn} from 'mdb-react-ui-kit';

const ClientProject=()=>{
  const[project, setProject]= useState({
    "id": 0,
    "name": "",
    "startDate": "",
    "endDate": "",
    "technology": "",
    "fRequirement": "",
    "nfRequirement": "",
    "budget": 0,
    "_Client": null,
    "clientId": 10
});

const user =  JSON.parse(localStorage.getItem('user-info'));
const navigate = useNavigate();
const {id}= useParams();

  const loadData= async()=>{
        await fetch(`http://localhost:44327/api/Project/details/${id}`,{
           
                headers:{
                    Authorization : `Bearer ${user.token}`
                }
            
        })
        .then(res=>res.json())
        .then(res=>{
            setProject(res);
        })
  }

  useEffect(()=>{
   loadData();
  },[])
  return (
    <section className="vh-100" >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  {/* <MDBCardImage src={adminInfo.profileImageSrc}
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid /> */}
                  <MDBTypography tag="h5">XXX</MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                  <MDBTypography tag="h5">{project.name}</MDBTypography>
                  <hr className="mt-0 mb-4"/>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Start Date</MDBTypography>
                        <MDBCardText className="text-muted">{project.startDate.split("T")[0]}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">End Date</MDBTypography>
                        <MDBCardText className="text-muted">{project.endDate.split("T")[0]}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    
                    <hr className="mt-0 mb-4"/>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Budget</MDBTypography>
                        <MDBCardText className="text-muted">{project.budget}Cr</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Technology</MDBTypography>
                        <MDBCardText className="text-muted">{project.technology}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr className="mt-0 mb-4"/>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Functional Requirement</MDBTypography>
                        <MDBCardText className="text-muted">{project.fRequirement}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Non Functional Requirement</MDBTypography>
                        <MDBCardText className="text-muted">{project.nfRequirement}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr className="mt-0 mb-4"/>                   
                    <MDBBtn className="mb-4 px-6" color='dark' size='md'  onClick={()=>{navigate(`/client/dashboard/${user.userId}`)}} >Back</MDBBtn>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>  
      </MDBContainer>
    </section>
  );
}

export default ClientProject;