const BASE_URL =  process.env.REACT_APP_BASEURL  //"http://localhost:44327/api"

export const getTeam=async(id=null,token)=>{
    if(id==null){
        return await fetch(`${BASE_URL}/Team`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
         })
         .then(res=> res.json())
         .then(res=>{
            return res;
         })
         .catch(err=> console.log(err));
    }
    else{
        return await fetch(`${BASE_URL}/Team?id=${id}`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
         })
         .then(res=> res.json())
         .then(res=>{
            return res;
         })
         .catch(err=> console.log(err));
    }
    
}

export const createTeam=(team,employeeIds, token)=>{
    return fetch(`${BASE_URL}/Team?employeeIds=${employeeIds}`,{
            method:'POST',
            headers:{
                Authorization : `Bearer ${token}`,
                "Accept":'application/json',
                "Content-Type":'application/json'
            },
            body:JSON.stringify(team)
         })
         .then(res=>res.json())
         .catch(err=> console.log(err))
}

export const getTeamsWithNoProject=(token)=>{
    return fetch(`${BASE_URL}/Team/noproject`,{
        method:'GET',
        headers:{
            "Authorization" : `Bearer ${token}`
        }
     })
     .then(res=> res.json())
     .then(res=>res)
     .catch(err=>console.log(err))
}