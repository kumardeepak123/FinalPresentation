import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, Outlet, useNavigate} from 'react-router-dom'
const Navigationbar=()=>{
    let user = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();

    function logOut(){
        localStorage.clear();
        navigate("/login");
    
      }
    function handleDashboard(){
         if(user.role === "Admin"){
            navigate(`/admin/dashboard/${user.userId}`);
           }
           else if(user.role === "Client"){
            navigate(`/client/dashboard/${user.userId}`);
           }
    }

    return (
        <>
        <Navbar  expand="lg" style={{backgroundColor:'#29ae7d'}}>
          <Container>
            <Navbar.Brand href="#home">Client Project Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {
                  !user &&
                  <Nav.Link href="login">Login</Nav.Link>
                }
                {
                    user &&
                    <>
                        
                        <NavDropdown class="btn btn-secondary dropdown-toggle"  title= "Myprofile">              
                        {/* <NavDropdown.Item >My Profile</NavDropdown.Item> */}
                        <NavDropdown.Item onClick={handleDashboard} >Dashboard</NavDropdown.Item>
                        <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Outlet/>
        </>
      );
}

export default Navigationbar;