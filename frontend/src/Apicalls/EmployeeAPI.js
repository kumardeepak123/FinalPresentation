const BASE_URL =  process.env.REACT_APP_BASEURL  //"http://localhost:44327/api"


export const getEmployee=async(id=null,token)=>{
    if(id==null){
        return await fetch(`${BASE_URL}/Employee`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
         })
         .then(res=> res.json())
         .then(res=>{
            return res;
         })
         .catch(err=>console.log(err));
    }
    else{
        return await fetch(`${BASE_URL}/Employee?id=${id}`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
         })
         .then(res=> res.json())
         .then(res=>{
            return res;
         })
         .catch(err=>console.log(err));
    }
   
}

export const createEmployee=(employee, token)=>{
   return fetch(`${BASE_URL}/Employee`,{
        method:'POST',
        headers:{
            Authorization : `Bearer ${token}`,
            "Accept":'application/json',
            "Content-Type":'application/json'
        },
        body:JSON.stringify(employee)
     })
     .then(res=>res.json())
     .then(res=>{return res})
     .catch(err=> console.log(err))
}

export const editEmployee=(id, employee, token)=>{
    return fetch(`${BASE_URL}/Employee/${id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            "Accept":'application/json',
            "Content-Type":'application/json'
        },
        body: JSON.stringify(employee)
 })
 .then(res=>res.json())
 .then(res=>res)
 .catch(err=>console.log(err))
}

export const deleteEmployee=(id, token)=>{
    return fetch(`${BASE_URL}/Employee/${id}`,{
              method:'DELETE',
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            .then(r=>r.json())
            .then(r=>r)
            .catch(err=>console.log(err))
}
