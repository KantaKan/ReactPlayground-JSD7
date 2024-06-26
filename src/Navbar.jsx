import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import App from "./App";

function NavRoute() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="/">Home</Link>
      <Link to="/pokemon">Pokemon</Link>
      <Link to="/Form">Axios.post</Link>
      <Link to="/grid">Grid</Link>
    </nav>
  );
}

export default NavRoute;
