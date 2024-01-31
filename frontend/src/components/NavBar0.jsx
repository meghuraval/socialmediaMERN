/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const NavBar0 = () => {
  return (
    <div>
      <ul className="flex flex-row h-[7dvh] gap-5 px-5 text-xl items-center bg-slate-900 text-white">
        <li className="text-yellow-300">
          <Link to="/homepage">Notii.</Link>
        </li>
        <li className="ml-auto">
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar0;
