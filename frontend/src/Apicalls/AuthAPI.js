const BASE_URL =  process.env.REACT_APP_BASEURL  //"http://localhost:44327/api"


export const signin=(email,password,role)=>{
   return fetch(`${BASE_URL}/Auth/signin?email=${email}&password=${password}&role=${role}`,{
        
        method:"GET",
        headers:{
          "Content-Type":"application/json",       
        }
       })
    .then(res=> res.json())
    .then(res=>{
        
        return res;
    })
    .catch(err=>{
        console.log(err);
        return err
    })
}