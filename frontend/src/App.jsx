import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/SIgnup";
import NavBar from "./components/NavBar";
import NavBar0 from "./components/NavBar0";
import { useState } from "react";
//import Signin from "./pages/SIgnin";
import SigninPage from "./pages/SigninPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      {authenticated ? <NavBar /> : <NavBar0 />}
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/homepage" Component={Homepage} />
        <Route
          path="/signin"
          element={<SigninPage setAuthenticated={setAuthenticated} />}
        />
        <Route path="/signup" Component={Signup} />
        <Route
          path="/account"
          element={<Account setAuthenticated={setAuthenticated} />}
        />
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
    </Router>
  );
}

export default App;
