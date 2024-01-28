/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const NavBar0 = () => {
  return (
    <div>
      <div>Notii Logo</div>
      <nav>
        <ul>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/homepage">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar0;
