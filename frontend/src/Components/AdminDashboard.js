import React,{useState, useEffect}from "react";
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {getEmployee}  from '../Apicalls/EmployeeAPI'
import { useNavigate } from "react-router";

const AdminDashboard=()=>{
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
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'));
  
  
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

  const goToAdminProfile=()=>{
    navigate(`/admin/profile`);
  }
return(
    <div className="h1 fw-bold mb-0" style={{marginTop:"5%"}}>
            <h1 style={{textAlign:"center"}}>Admin Dashboard</h1>
            <h5 style={{textAlign:"center"}}>Welcome {adminInfo.name}</h5>
            
        <div style={{marginTop:"7vw"}}>
        <Container>
    <Row>
        <Col sm={3}>
    <Card style={{background:"#cdebe0", border:"1px solid rgb(0,0,0)"}}>
      <Card.Body>
        <Card.Text>
            <h4 className="text-muted">View Profile</h4>
            
        </Card.Text>
        <Button style={{marginTop:"30px",backgroundColor:'#29ae7d'}} onClick={goToAdminProfile} >Go</Button>
      </Card.Body>
    </Card>
    </Col>
    <Col sm={3}>
    <Card style={{background:"#cdebe0", border:"1px solid rgb(0,0,0)"}}>
      <Card.Body>
      <Card.Text>
            <h4 className="text-muted" >Handle Clients</h4>
            
        </Card.Text>
        <Button  style={{marginTop:"30px",backgroundColor:'#29ae7d'}} onClick={()=>navigate(`/admin/handle/clients`)} >Go</Button>
      </Card.Body>
    </Card>
    </Col>
    <Col sm={3}>
    <Card style={{background:"#cdebe0", border:"1px solid rgb(0,0,0)"}}>
      <Card.Body>
      <Card.Text>
            <h4 className="text-muted" >Manage Projects</h4>
            
        </Card.Text>
        <Button  style={{marginTop:"30px",backgroundColor:'#29ae7d'}} onClick={()=>{navigate(`/admin/projects`)}} >Go</Button>
      </Card.Body>
    </Card>
    </Col>
    <Col sm={3}>
    <Card style={{background:"#cdebe0", border:"1px solid rgb(0,0,0)"}}>
      <Card.Body>
      <Card.Text>
            <h4 className="text-muted" >Manage Teams</h4>
            
        </Card.Text>
        <Button  style={{marginTop:"30px",backgroundColor:'#29ae7d'}} onClick={()=>{navigate(`/admin/manage-teams`)}}>Go</Button>
      </Card.Body>
    </Card>
    </Col>
    
    </Row>
    </Container>
    </div>   
</div>
);
}


export default AdminDashboard;