import Register from "./pages/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { useDispatch } from "react-redux";
import { storeloginuser } from "./Redux/UserSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    var isuser = JSON.parse(localStorage.getItem("loginuser"));
    if (isuser) {
      dispatch(storeloginuser(isuser));
 
    }
  }, []);

  var is_login = useSelector((store) => store.Users.loginuser);

  return (
    <div className="sm:container  m-auto">
      <Routes>
        <Route
          path="/"
          element={is_login ? <Navigate replace to={"/users"} /> : <Register />}
        ></Route>
        <Route
          path="/login"
          element={is_login ? <Navigate replace to={"/users"} /> : <Login />}
        ></Route>

        <Route
          path="/users"
          element={is_login ? <Chat /> : <Navigate replace to={"/login"} />}
        ></Route>
        <Route
          path="/users/:id"
          element={is_login ? <Chat /> : <Navigate replace to={"/login"} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
