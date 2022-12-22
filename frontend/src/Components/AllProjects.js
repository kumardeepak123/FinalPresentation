import React, {useState, useEffect}from 'react'
import {useNavigate} from 'react-router-dom'
import {getProject} from '../Apicalls/ProjectAPI'
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

var items =[];

const AllProjects=()=>{

   const[projects,setProjects]= useState([]);
   //pagination
   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);
   const[itemsPerPage,setItemsPerPage]= useState(6);

   const user =  JSON.parse(localStorage.getItem('user-info'));

   const navigate = useNavigate();
   const loadData=()=>{
    getProject(null, user.token)
    .then(res=>{
        const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setProjects(res.slice(itemOffset, endOffset));
    items = res;
    setPageCount(Math.ceil(items.length / itemsPerPage));
        
    })
   }

   const deleteProject=(id)=>{
    if(!window.confirm("Do you really want to delete?"))
    {
        return;
    }
        fetch(`http://localhost:44327/api/Project/delete-project/${id}`,{
        method:'DELETE',    
        headers:{
                Authorization:`Bearer ${user.token}`
            }
        })
        .then(res=>res.json())
        .then(res=>{
            toast.success("deleted successfully!", {
                position: toast.POSITION.TOP_RIGHT
              });
            loadData();

        })
   }
   
   useEffect(()=>{
    loadData();
   },[itemOffset, itemsPerPage])

   const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

    return(
        <div className='container'>
            <button className='btn btn-lg btn-primary mt-3 mb-3' onClick={()=>{navigate(`/admin/create/project`)}}>Add Project</button>
            <div  class="row">
            {projects.map((p,i)=>(
                
                <div key={i} class="col-xl-4 mb-4">
                    <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            
                            <div class="ms-3">
                            <p class="fw-bold mb-1">{p.name}</p>
                            {/* <p class="text-muted mb-0">Budget: {p.budget}cr</p> */}
                            </div>
                        </div>
                        
                        </div>
                    </div>
                    <div
                        class="card-footer border-0 bg-light p-2 d-flex justify-content-around"
                    >
                        <button className='btn   text-muted m-0 ' onClick={()=>{navigate(`/admin/view/project/${p.id}`)}}>
                          View
                        </button>
                        <button className='btn   text-muted m-0 ' onClick={()=>{navigate(`/admin/edit/project/${p.id}`)}}>
                          Edit
                        </button>
                        <button className='btn   text-muted m-0 ' onClick={()=>{deleteProject(p.id)}}>
                          Delete
                        </button>
                    </div>
                    </div>
                </div>
          
              
            ))}
            </div>
            <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ToastContainer />
        </div>
    )
}

export default AllProjects;