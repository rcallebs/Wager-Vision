import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

const Nav = ({ user, handleLogOut }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Betting App
        </Typography> */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={NavLink} to="/bets">
                Bets
              </Button>
              <Button color="inherit" component={NavLink} to="/add-bet">
                Add a Bet
              </Button>
              <Button color="inherit" component={NavLink} to="/odds">
                Upcoming Odds
              </Button>
              <Button color="inherit" onClick={handleLogOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={NavLink} to="/register">
                New User
              </Button>
              <Button color="inherit" component={NavLink} to="/login">
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

// import React from "react";
// import { NavLink } from "react-router-dom";

// const Nav = ({ user, handleLogOut }) => {
//   return (
//     <nav className="nav-links">
//       <ul>
//         <NavLink to="/">
//           <li>Home</li>
//         </NavLink>
//         {user && (
//           <>
//             <NavLink to="/bets">
//               <li>Bets</li>
//             </NavLink>
//             <NavLink to="/bets/add-bet">
//               <li>Add a Bet</li>
//             </NavLink>
//             <NavLink to="/odds">
//               <li>Upcoming Odds</li>
//             </NavLink>
//             <NavLink onClick={handleLogOut}>
//               <li>Logout</li>
//             </NavLink>
//           </>
//         )}
//         {!user && (
//           <>
//             <NavLink to="/register">
//               <li>New User</li>
//             </NavLink>
//             <NavLink to="/login">
//               <li>Login</li>
//             </NavLink>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Nav;
