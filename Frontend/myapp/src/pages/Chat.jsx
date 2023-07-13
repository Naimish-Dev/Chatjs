import React, { useMemo } from 'react'
import Header from "../components/Header";
import Userlist from "../components/Userlist";
import Chatarea from "../components/Chatarea";
import {useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SocketFC from "../components/SocketRequest";
import { offlineupdate, onlineupdate } from "../Redux/AlluserSlice";
import { useDispatch, useSelector } from 'react-redux';
const Chat = () => {
  const {id}=useParams();
const dispatch = useDispatch()
  var is_login = useSelector((store) => store.Users.loginuser);
  const socket = useMemo(() => SocketFC(is_login._id), []); 

  useEffect(() => {    
socket.on("getonlineuser", (online) => {
  dispatch(offlineupdate(online));
},[]);

socket.on("getofflineuser", (offline) => {
  dispatch(onlineupdate(offline));
})
}, []);


  return (
    <>
      <Header></Header>
      <div className="flex gap-1 chat-area-height ">
        <Userlist></Userlist>
        {id ? (
          <Chatarea rid={id}></Chatarea>
        ) : (
          <div className="xl:basis-4/5 md:basis-9/12 basis-3/5   h-full flex items-center justify-center  border-solid border border-black round-md text-3xl text-gray-300 font-bold">
            Select User to Chat
          </div>
        )}
      </div>
    </>
  );
}

export default Chat