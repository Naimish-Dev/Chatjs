import { MdDelete } from "react-icons/md";
import { useState} from "react";

const Message = ({ data, sender, click }) => {



  const [deletebtn, setdeletebtn] = useState(false);
  const messagehoverhendler = () => {
    setdeletebtn(!deletebtn);
  };

 

  return (
    <span
      className={`flex items-center gap-1  ${
        data.sender_id === sender ? "ms-auto" : "me-auto"
      } `}
    >
      <span
        onClick={messagehoverhendler}
        className={`bg-red-400 break-words cursor-pointer messageboxwidth rounded-sm  px-1 m-1  ${
          data.sender_id === sender ? "order-1" : "order-2"
        } `}
      >
        {data.message}
      </span>
      {deletebtn && (
        <span
          onClick={() => {
            click(data._id);
          }}
          className={`tras  ${
            data.sender_id === sender ? "order-2" : "order-1"
          } `}
        >
          <MdDelete />
        </span>
      )}
    </span>
  );
};

export default Message;
