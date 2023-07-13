import axios from "axios"
const axiosReq=()=>{

  if (localStorage.getItem("loginuser")) {
     var {token}  = JSON.parse(localStorage.getItem("loginuser"))
   }

  return axios.create({
  headers: {
    token: `Bearer ${token}`,
  },
});
}
  
export default axiosReq;

 
  


