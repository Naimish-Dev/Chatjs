import io from "socket.io-client";

const SocketFC=(_id) => {
    const URL = "http://localhost:1000/PersonalCahtNamespace";

    return io.connect(URL, {
        auth: {
            token: _id,
        },
    });
    
  

}


export default SocketFC;