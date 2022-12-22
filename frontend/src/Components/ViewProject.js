import React,{useEffect, useState}from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn} from 'mdb-react-ui-kit';
import {getProject} from '../Apicalls/ProjectAPI'
const ViewProject=()=>{
const[project, setProject]= useState(
  {
    
    "name": "",
    "startDate": "",
    "endDate": "",
    "technology": "",
    "nfRequirement": "",
    "budget": 0,
    "statuc": "",
    "teams":[],
    "client":{}
}
);

const user =  JSON.parse(localStorage.getItem('user-info'));
const navigate = useNavigate();
const {id}= useParams();

  const loadProject= ()=>{
        getProject(id, user.token)
        .then(res=>{
            
            setProject(res[0]);
            
        })
  }

  
  useEffect(()=>{
    loadProject();
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

                    <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Client</MDBTypography>                           
                          </MDBCol>
                          
                    </MDBRow>
                    {
                          project.client !== null ?(
                            <ul className="list-group list-group-light">
                              <li className="list-group-item d-flex justify-content-between ">
                              <div className="d-flex align-items-center">
                              <div className="ms-3">
                                <p className="fw-bold mb-1">{project.client.name}</p>
                              </div>
                              </div>
                              </li>
                            </ul>
                                  
                                  
                          
                          ):(
                            <p style={{color:'red'}}>No client assigned</p>
                          )
                        }
                    <hr className="mt-0 mb-4"/>

                    <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Teams working on</MDBTypography>                           
                          </MDBCol>
                          
                    </MDBRow>
                    {
                          project.teams !== null && project.teams.length!=0 ?(
                            project.teams.map((e,i)=>
                            <ul key={i} className="list-group list-group-light">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">

                                    <div className="ms-3">
                                      <p className="fw-bold mb-1">{e.name}</p>
                                    </div>
                                  </div>
                                  <button className="btn  btn-light btn-sm mr-2" onClick={()=>{navigate(`/admin/team-details/${e.id}`)}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                  </svg>
                                  </button> 
                                  
                                  {/* <button className="btn  btn-rounded text-danger btn-sm" onClick={()=>{deallocateProject(e)}}>Deallocate</button> */}
                                </li>
                              </ul>
                          )
                          ):(
                            <p style={{color:'red'}}>No Teams</p>
                          )
                        }
                    <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Status</MDBTypography> 
                            {project.status === 'Active' &&
                              <MDBCardText className="text-success font-weight-bold">{project.status}</MDBCardText>
                            }
                            {project.status === 'Cancelled' &&
                              <MDBCardText className="text-danger font-weight-bold">{project.status}</MDBCardText>
                            }
                            {project.status === 'On hold' &&
                              <MDBCardText className="text-warning font-weight-bold">{project.status}</MDBCardText>

                            }
                            {project.status === 'Completed' &&
                              <MDBCardText className="text-success font-weight-bold">{project.status}</MDBCardText>
                            }
                            
                          </MDBCol>
                          
                          
                    </MDBRow>
                    <button className="btn btn-secondary mt-2"  onClick={()=>{navigate(`/admin/projects`)}} >Back</button>
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

export default ViewProject;