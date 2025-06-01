import { ToastContainer } from "react-toastify";
import Router from "./Router";
import "./index.css";
import { useContext, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import { DataContext } from "./components/Context/Context";
import { Type } from "./Utility/action.type";
function App() {
  const [_, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
