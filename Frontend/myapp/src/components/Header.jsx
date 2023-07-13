import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storelogoutuser } from "../Redux/UserSlice";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onlineupdate } from '../Redux/AlluserSlice';
import SocketFC from './SocketRequest';
const Header = () => {
const dispatch=useDispatch()
const navigate = useNavigate();

  const logouthendler=()=>{
    localStorage.removeItem("loginuser");
    const socket = SocketFC();
socket.on("getofflineuser", (offline) => {
dispatch(onlineupdate(offline));
});
dispatch(storelogoutuser());
navigate("/")

  }
const data = useSelector((store) => store.Users.loginuser);
  return (
    <div className="flex justify-between p-3 shadow-md mb-4 relative">
      <div>
        <h1 className="text-2xl ">Chat-JS</h1>
      </div>
      <div className="dilogtrigger cursor-pointer">
        <img
          src={data.img}
          alt="profile"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="dilogtarget absolute right-9 z-10 top-12 bg-white p-4 flex flex-col gap-3 shadow-md  border border-slate-300 rounded-sm  ">
          <Link to="/profile" className="font-medium">
            Profile
          </Link>
          <button
            onClick={logouthendler}
            className="text-red-600  font-semibold border border-red-700 rounded-sm px-3 py-1 hover:text-white hover:bg-red-700  "
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header