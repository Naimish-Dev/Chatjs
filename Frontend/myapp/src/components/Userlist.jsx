import React from 'react';
import Userbox from './userbox';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setallusers } from "../Redux/AlluserSlice";
import axiosReq  from "./Axios";
import Searchuser from './Searchuser';
import {clearchat} from "../Redux/ChatSlice"

const Userlist = () => {
const dispatch = useDispatch()
const reqInstance= axiosReq();

useEffect (() => {
  const accessusers=async ()=>{
    try {
      const responce = await reqInstance.get("http://localhost:1000/api/users");
      if(responce.status === 201 ){
        dispatch(setallusers(responce.data));
      }
    } catch (error) {
      
    }
  }
  accessusers()
}, [])

const data = useSelector((store) => store.allUsers.allusers);
const clearoldlocalchat = () => {
  dispatch(clearchat([]));
};
return (
  <div className="  md:basis-3/12  basis-2/5 border-solid border border-black-800 round-md  overflow-y-auto">
    <Searchuser> </Searchuser>

     { data?.map((value,index)=>{
       return (
         <Userbox
           key={value._id}
           user={value}
           clearoldlocalchat={clearoldlocalchat}
         />
       ); 
       })}
    </div>
  );
}

export default Userlist