import React from 'react'
import { Link } from 'react-router-dom';

const Userbox = ({ user, clearoldlocalchat }) => {
  return (
    <Link to={`/users/${user._id}`}>
      <div
        className="flex items-center  py-1 px-2 my-2 shadow-md round-sm  hover:bg-slate-50  duration-100 cursor-pointer  "
        onClick={ clearoldlocalchat}
      >
        <img
          src={user?.img}
          alt="profile"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="ms-3">
          <h6 className="text-lg">{user?.username}</h6>
          <p className="text-sm text-gray-400 line linehight">
            {user?.is_online ? "online" : "offline"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Userbox;