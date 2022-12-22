const BASE_URL =  process.env.REACT_APP_BASEURL  //"http://localhost:44327/api"

export const getProject=async(id=null, token)=>{
    if(id!=null){
        return await fetch(`${BASE_URL}/Project?id=${id}`,{
        
            headers:{
                Authorization : `Bearer ${token}`
            }
        
        })
        .then(res=> res.json())
        .then(res=>res)
        .catch(err=>console.log(err))
    }
    else{
        return await fetch(`${BASE_URL}/Project`,{
        
            headers:{
                Authorization : `Bearer ${token}`
            }
        
        })
        .then(res=> res.json())
        .then(res=>res)
        .catch(err=>console.log(err))
    }
    
}

export const createProject=(project, teamIds, token)=>{
    return fetch(`${BASE_URL}/Project?TeamIds=${teamIds}`,{
            method:'POST',
            headers:{
                Authorization : `Bearer ${token}`,
                "Accept":'application/json',
                "Content-Type":'application/json'
            },
            body:JSON.stringify(project)
            
        })
        .then(res=>res.json())
        .then(res=>res)
        .catch(err=>console.log(err))
}

export const editProject=(id, project, teamIds,token)=>{
    return fetch(`${BASE_URL}/Project/${id}?TeamIds=${teamIds}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            "Accept":'application/json',
            "Content-Type":'application/json'
        },
        body: JSON.stringify(project)
     })
     .then(res=>res.json())
     .then(res=>res)
     .catch(err=>console.log(err))
}