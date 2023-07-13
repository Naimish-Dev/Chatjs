import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeloginuser } from "../Redux/UserSlice";
import SocketFC from "../components/SocketRequest";

const Register = () => {
  const [formdata, setformdata] = useState({});
  const [formfile, setformfile] = useState("");
  const [formload, setformload] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formdatahendler = (e) => {
    let { value } = e.target;
    let { name } = e.target;
    setformdata((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const RegisterRequest = async () => {
    const form = new FormData();
    form.append("username", formdata.username);
    form.append("email", formdata.email);
    form.append("password", formdata.password);
    form.append("img", formfile);
    try {
      setformload(true);
      const responce = await axios.post(
        "http://localhost:1000/api/register",
        form
      );
      if (responce.status === 201) {
             SocketFC(responce.data._id);

        const stringfyuser = JSON.stringify(responce.data);
        localStorage.setItem("loginuser", stringfyuser);
        dispatch(storeloginuser(responce.data));
        navigate("/users");
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
        <h1 className="text-2xl font-semibold	text-center	"> Register </h1>
        <input
          className="border-solid border-2 border-slate-900  py-1 rounded-sm	 px-2"
          type="text"
          placeholder="Name"
          name="username"
          onChange={formdatahendler}
        />
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
        <input
          type="file"
          onChange={(e) => {
            setformfile(e.target.files[0]);
          }}
        />
        <Link className="font-semibold" to="/login">
          I have an Account!
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

export default Register;
