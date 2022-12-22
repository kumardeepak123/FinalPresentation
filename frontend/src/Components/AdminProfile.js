import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn} from 'mdb-react-ui-kit';
import {getEmployee}  from '../Apicalls/EmployeeAPI'

const AdminProfile=()=>{
  const[adminInfo, setAdminInfo]=useState(
    {
        "id": 0,
        "name": "",
        "email": "",
        "password": "",
        "phone": "",
        "organization": "",
        "profileImageName": "",
        "agreementPaperName": "",
        "role": "",
        "projects": null,
        "profileImageFile": null,
        "profileImageSrc": "",
        "agreementPaperFile": null,
        "agreementPaperSrc": ""
    });
  const[error, setError]= useState("");
  const user =  JSON.parse(localStorage.getItem('user-info'));
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(user.role!== "Admin"){
        alert("You are not authorized");
        localStorage.clear();
        navigate("/login");
      }

      getEmployee(user.id, user.token)
      .then(res=>{
        
          setAdminInfo(res[0]);
      })
      .catch(err=>console.log(err))
  },[])

  function BacktoDash(){
        navigate(`/admin/dashboard/${user.userId}`);
  }
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
                  <MDBTypography tag="h5">{adminInfo.name}</MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                  <MDBTypography tag="h6">Information</MDBTypography>
                  <hr className="mt-0 mb-4"/>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">{adminInfo.name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Organization</MDBTypography>
                        <MDBCardText className="text-muted">hexaware</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    
                    <hr className="mt-0 mb-4"/>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{adminInfo.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{adminInfo.phone}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    {/* <MDBTypography tag="h6">Information</MDBTypography> */}
                    <hr className="mt-0 mb-4" />
                    
                    {/* <button className="btn btn-md mb-2" onClick={()=>{navigate(`/admin/profile/edit/${user.userId}`)}}>Edit</button> */}
                    <br/>
                    <MDBBtn className="mb-4 px-6" color='dark' size='md'  onClick={BacktoDash} >Back To Dashboard</MDBBtn>
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

export default AdminProfile;