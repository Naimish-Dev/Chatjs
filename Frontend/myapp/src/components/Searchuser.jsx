import React, { useEffect, useState } from 'react'
import { clearuserSerch, userSerch } from '../Redux/AlluserSlice';
import {useDispatch} from "react-redux"
const Searchuser = () => {
const dispatch=useDispatch()

const [search, setsearch] = useState("")
const Sclearhendler=()=>{
    setsearch("")
    dispatch(clearuserSerch());

}
useEffect(() => {
  const interId = setTimeout(() => {
    dispatch(userSerch(search));
    if (!search) {
            dispatch(clearuserSerch());
            }
  }, 400);

  return () => {
    clearTimeout(interId);
  };

}, [search]);
    
  return (
    <div className="flex content-between p-1  bg-white  shadow-md  rounded-sm  mb-2 sticky top-0">
      <input
        type="text"
        value={search}
        className="outline-0 w-11/12"
        placeholder='Search'
        onChange={(e) => setsearch(e.target.value)}
      />
      {search && (
        <span
          onClick={Sclearhendler}
          className="font-semibold px-1 cursor-pointer"
        >
          x
        </span>
      )}
    </div>
  );
}

export default Searchuser