import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";
// import { useContext, useEffect } from "react";
import SignUpForm from "./components/signup";
import AllUser from "./components/allUser";
// import { authContext } from "./contextApi/auth";
import Layout from "./components/layout";
import LoginPage from "./components/login";
// import axios from "axios";
function App() {
  // const { authorized, setAuthorized, setUser, user } = useContext(authContext);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/getuser", {
  //         withCredentials: true,
  //       });
  //       console.log(response.data);

  //       setUser(response.data.user);
  //       setAuthorized(true);
  //     } catch (error) {
  //       setAuthorized(false);
  //     }
  //   };
  //   fetchUser();
  // }, [authorized]);
  // console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/allUser" element={<AllUser />} />
        <Route path="/login" element={<LoginPage />} />

        {/* <Route path="/time/:id" element={< />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
