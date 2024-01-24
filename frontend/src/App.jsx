import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Account from "./pages/Account";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/homepage" Component={Homepage} />
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/account" Component={Account} />
      </Routes>
    </Router>
  );
}

export default App;
