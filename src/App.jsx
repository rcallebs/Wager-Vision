import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { NavLink } from "react-router-dom";
import Nav from "./components/Nav";
import Bets from "./pages/Bets";
import BetDetails from "./pages/BetDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { CheckSession } from "./services/Auth";

const App = () => {
  const [user, setUser] = useState(null);

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken();
    }
  }, []);
  console.log(user);

  return (
    <div className="App">
      <nav>
        <Nav user={user} handleLogOut={handleLogOut} />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login setUser={setUser} />} />
          <Route path="/bets" element={<Bets />} />
          <Route path="/bets/:id" element={<BetDetails />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
