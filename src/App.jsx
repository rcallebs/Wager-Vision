import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { NavLink } from "react-router-dom";
import Nav from "./components/Nav";
import Bets from "./pages/Bets";
import BetDetails from "./pages/BetDetails";
import Register from "./pages/Register";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/bets" element={<Bets />} />
          <Route path="/bets/:id" element={<BetDetails />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
