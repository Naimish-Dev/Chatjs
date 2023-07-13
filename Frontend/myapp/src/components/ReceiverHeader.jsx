import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const ReceiverHeader = ({rid}) => {

const  [receiverdata, setreceiverdata] = useState({})

  const data = useSelector((store) => store.allUsers.allusers);
  useEffect(() => {
    setreceiverdata(data.find((user) => user._id === rid));
  }, [data, rid]);


  return (
    <div className="flex items-center  py-1 px-2 border-solid border-b	 border-gray-400 round-sm  ">
      <img
        src={receiverdata.img}
        alt="profile"
        className="w-10 h-10 object-cover rounded-full"
      />
      <div className="ms-3">
        <h6 className="text-lg">{receiverdata.username}</h6>
        <p className="text-sm">
          {receiverdata.is_online ? "online" : "offline"}
        </p>
      </div>
    </div>
  );
}

export default ReceiverHeader;