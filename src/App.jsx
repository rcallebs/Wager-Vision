import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Bets from "./pages/Bets";
import BetDetails from "./pages/BetDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { CheckSession } from "./services/Auth";
import AddBet from "./pages/AddBet";
import OddsData from "./pages/OddsData";
import SportsData from "./components/SportsData";
import BetHistory from "./pages/BetHistory";

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

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/bets" element={<Bets />} />
          <Route path="/settled-bets" element={<BetHistory />} />
          <Route path="/bets/:id" element={<BetDetails />} />
          <Route path="/add-bet" element={<AddBet />} />
          <Route path="/upcoming" element={<SportsData />} />
          <Route path="/odds" element={<OddsData />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
