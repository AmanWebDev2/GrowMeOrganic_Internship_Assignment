import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import { useEffect, useState } from "react";

function App() {

  const [isAuthenticated,setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const data = localStorage.getItem('userDetails');
    if(!data) return;
    // decrypt user data
    const encryptedUserDetails = JSON.parse(data);
    const decryptedUserDetails = JSON.parse(atob(encryptedUserDetails));
    if(!decryptedUserDetails.isMissingDetails) {
      setIsAuthenticated(true);
    } 
  },[]);

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/users" element={ isAuthenticated ? <Users/> : <>Must enter the details before accessing the page</>} />
    </Routes>
    </>
  );
}

export default App;
