const BASE_URL =  process.env.REACT_APP_BASEURL  //"http://localhost:44327/api"

export const getClient=async(id=null, token,sortBy,orderBy,searchBy)=>{
    if(id == null)
    {
       return fetch(`${BASE_URL}/Client/?sortBy=${sortBy}&&orderBy=${orderBy}&&searchByName=${searchBy}`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(res=> res.json())
        .then(res=>res)
        .catch(err=>console.log(err))
    }
    else{
        return fetch(`${BASE_URL}/Client/?id=${id}`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(res=> res.json())
        .then(res=>res)
        .catch(err=>console.log(err))
    }
}

export const getProjectsUnderClient=async(id, token)=>{
    return await fetch(`${BASE_URL}/Project/under/client/${id}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          .then(res=>res.json())
          .then(res=>res)
          .catch(err=>console.log(err))
}

export const getProjectsForAssignmentToClient=(token)=>{
    return  fetch(`${BASE_URL}/Project/projects/for/assignment`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          .then(res=>res.json())
          .then(res=>res)
          .catch(err=>console.log(err))
}

export const createClient=( token, projectIds, formData)=>{
    return fetch(`${BASE_URL}/Client/?ProjectIds=${projectIds}`,{
            method:'POST',
            headers:{
                "Authorization" : `Bearer ${token}`,
                // "Content-Type": "multipart/form-data"
            },
            body: formData
         })
         .then(res=>res.json())
         .then(res=>res)
         .catch(err=>console.log(err))
}