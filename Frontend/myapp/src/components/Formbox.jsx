import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import axiosReq from './Axios';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import { pushnewChat } from '../Redux/ChatSlice';
import { useDispatch } from 'react-redux';
const Formbox = () => {
 const dispatch = useDispatch()

    const socket = useMemo(() =>  io.connect("http://localhost:1000/PersonalCahtNamespace"), []);
  
  const [first, setfirst] = useState("");
    const { id } = useParams();

  const { _id } = useSelector((store) => store.Users.loginuser);
  const texthendler = (e) => {
    setfirst(e.target.value);
  };
  const axios = axiosReq();
  const messagehendler = async () => {
    if (first) {
      try {
        const responce = await axios.post(
          `http://localhost:1000/api/user/${id}`,
          {
            receiver_id: id,
            sender_id: _id,
            message: first,
          }
        );
        if (responce.status === 201) {
          socket.emit("new_chat", responce.data) 
                dispatch(pushnewChat(responce.data));

        }
      } catch (error) {
        console.log(error);
      }
    }
    setfirst("");
  };

  return (
    <div className="message-inputbox w-fu ll flex justify-center gap-3 pt-1   bottom-0  bg-white ">
      <input
        className="w-9/12 px-2  border-2 border-black rounded-md "
        placeholder="Message"
        value={first}
        onChange={(e) => {
          texthendler(e);
        }}
      />
      <button
        onClick={messagehendler}
        className=" bg-red-500 px-4 py-1 text-white hover:bg-red-600 rounded-md"
      >
        Send
      </button>
    </div>
  );
}

export default Formbox