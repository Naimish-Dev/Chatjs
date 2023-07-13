import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { storeloginuser } from "../Redux/UserSlice";
import SocketFC from "../components/SocketRequest";

const Login = () => {

  const [formdata, setformdata] = useState({});
  const [formload, setformload] = useState(false);

  const dispatch=useDispatch();
  const navigation = useNavigate();
  const formdatahendler = (e) => {
    let { value } = e.target;
    let { name } = e.target;
    setformdata((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const RegisterRequest = async () => {
   
    setformload(true);
    try {
      const responce = await axios.post(
        "http://localhost:1000/api/login",
        formdata
      );
      if(  responce.status === 201){
        SocketFC(responce.data._id);
       
        const loguser=JSON.stringify(responce.data)       
        localStorage.setItem("loginuser",loguser);
        dispatch(storeloginuser(responce.data))
       navigation("/users");
      }
    } catch (error) {
      console.error(error);
    }
    setformload(false);
  };
  const formsubmithendler = (e) => {
    e.preventDefault();
    RegisterRequest();
  };
  return (
    <div className="w-100 h-screen flex justify-center items-center">
      <form
        className="flex  sm:w-100 screen-100  flex-col justify-center gap-3 py-5 px-7 border-solid border-2 rounded-sm	 	 "
        onSubmit={(e) => {
          formsubmithendler(e);
        }}
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-semibold	text-center	"> Login </h1>

        <input
          className="border-solid border-2 border-slate-900  py-1 rounded-sm	 px-2"
          type="email"
          placeholder="Email"
          name="email"
          onChange={formdatahendler}
        />
        <input
          className="border-solid border-2 border-slate-900  py-1 rounded-sm	 px-2"
          type="password"
          placeholder="password"
          name="password"
          onChange={formdatahendler}
        />
        <Link to="/" className="font-semibold">
          I Don`t have an Account
        </Link>
        <button
          value="Register"
          className="btn border-solid border-2 border-slate-900  py-1 rounded-sm	 px-2"
        >
          {formload ? "loading..." : "Register"}{" "}
        </button>
      </form>
    </div>
  );
};

export default Login;
