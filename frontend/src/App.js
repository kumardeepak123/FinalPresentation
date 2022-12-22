
import React from 'react';
import {BrowserRouter,Route, Routes} from'react-router-dom'
import Login from './Components/Login'
import ClientDashboard from './Components/ClientDashboard';
import Protected from './Auth/Protected';
import Home from './Components/Home';
import AdminDashboard from './Components/AdminDashboard';
import Navigationbar from './Components/Navigationbar';
import AdminProfile from './Components/AdminProfile';
import HandleClients from './Components/HandleClients';
import CreateClient from './Components/CreateClient';
import ViewCliet from './Components/ViewClient';
import EditClient from './Components/EditClient';
import AllProjects from './Components/AllProjects';
import ViewProject from './Components/ViewProject';
import CreateProject from './Components/CreateProject';
import EditProject from './Components/EditProject';
import EditAdmin from './Components/EditAdmin';
import ClientProject from './Components/ClientProject';
import ClientEdit from './Components/ClientEdit';
import ClientProjectsView from './Components/ClientProjectsView';
import ManageTeams from './Components/ManageTeams';
import CreateTeam from './Components/CreateTeam';
import CreateEmployee from './Components/CreateEmployee';
import EditEmployee from './Components/EditEmployee';
import TeamDetails from './Components/TeamDetails';
function App() {
  return (
    <div > 
     <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigationbar/>}>
            <Route index  element={<Home/>}/>     
            <Route path="/login" element={<Login/>}/>
            <Route path='/client/dashboard/:id' element={<Protected Cmp={ClientDashboard}/>}/> 
            <Route path='/admin/dashboard/:id' element={<Protected Cmp={AdminDashboard}/>}/>  
            <Route path='/admin/profile' element={<Protected Cmp={AdminProfile}/>}/>  
            <Route path='/admin/handle/clients' element={<Protected Cmp={HandleClients}/>}/>  
            <Route path='/admin/create/client' element={<Protected Cmp={CreateClient}/>}/>  
            <Route path='/admin/view/client/:id' element={<Protected Cmp={ViewCliet}/>}/>  
            <Route path='/admin/edit/client/:id' element={<Protected Cmp={EditClient}/>}/> 
            <Route path='/admin/projects' element={<Protected Cmp={AllProjects}/>}/>  
            <Route path='/admin/view/project/:id' element={<Protected Cmp={ViewProject}/>}/>  
            <Route path='/admin/create/project' element={<Protected Cmp={CreateProject}/>}/>  
            <Route path='/admin/edit/project/:id' element={<Protected Cmp={EditProject}/>}/>  
            <Route path='/admin/profile/edit/:id' element={<Protected Cmp={EditAdmin}/>}/> 
            <Route path='/admin/client/project/:id' element={<Protected Cmp={ClientProjectsView}/>}/> 
            <Route path='/client/projects/:id' element={<Protected Cmp={ClientProject}/>}/> 
            <Route path='/client/edit/:id' element={<Protected Cmp={ClientEdit}/>}/> 
            <Route path='/admin/manage-teams' element={<Protected Cmp={ManageTeams}/>}/> 
            <Route path='/admin/create-team' element={<Protected Cmp={CreateTeam}/>}/> 
            <Route path='/admin/create-employee' element={<Protected Cmp={CreateEmployee}/>}/> 
            <Route path='/admin/edit-employee/:id' element={<Protected Cmp={EditEmployee}/>}/> 
            <Route path='/admin/team-details/:id' element={<Protected Cmp={TeamDetails}/>}/> 
        </Route> 
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
