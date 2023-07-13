import React, { useEffect, useState } from 'react';
import ReceiverHeader from './ReceiverHeader';
import Message from './Message';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deletechat, pushnewChat } from '../Redux/ChatSlice';
import { useMemo } from 'react';
import Formbox from './Formbox';
import { storeChat } from '../Redux/ChatSlice';
import axiosReq from './Axios';
import SocketFC from './SocketRequest';

const Chatarea = ({rid}) => {
const [newmessage, setnewmessage] = useState([]);
  const scrollhendler = useRef();
  const dispatch=useDispatch();

  
  const {_id} = useSelector((store) => store.Users.loginuser);
  
  const socket = useMemo(() => SocketFC(), []);

  useEffect(()=>{
    socket.emit("loadoldmessage", { sender_id: _id ,receiver_id:rid});
    socket.on("oldmessages", (oldchat) => {
      dispatch(storeChat(oldchat));
    });
  },[rid,_id])
  
  
  useEffect(() => {
    socket.on("loadnewchat", (data) => {
setnewmessage(data);
    },[]);

    socket.on("mdsucess", (rid) => {
      dispatch(deletechat(rid));
    });
  }, []);

  useEffect(() => {
    if (newmessage.sender_id === rid && newmessage.receiver_id === _id) {
      dispatch(pushnewChat(newmessage));
      return;
    }
  }, [newmessage]);
  


const axios = axiosReq();

const onclickfc=async(Mid)=>{
  try {
    const responce = await axios.post(
      `http://localhost:1000/api/user/message/${Mid}`,
       { Mid }
       );
       if (responce.status === 201) {
         socket.emit("mdrequest", Mid);
               dispatch(deletechat(Mid));
        }
      } catch (error) {
        console.log(error);
    }
  }
  
  const chats = useSelector((store) => store.chatdata.chatdata);
  useEffect(() => {
    scrollhendler.current.scrollTop = scrollhendler.current.scrollHeight;
  }, [chats]);
  return (
    <div className=" md:basis-9/12 basis-3/5  border-solid border border-gray-300 round-md ">
      <ReceiverHeader rid={rid}></ReceiverHeader>
      <div
        className="overflow-y-auto massage-box-height flex flex-col  p-1"
        ref={scrollhendler}
      >
        {chats?.map((val) => {
          return (
            <Message key={val._id} data={val} sender={_id} click={onclickfc} />
          );
        })}
      </div>

      <Formbox />
    </div>
  );
}

export default Chatarea