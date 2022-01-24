import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <Link to="/">TO GARAGE</Link>
      <Link to="/winners">TO WINNERS</Link>
    </div>
  );
};

export default Navbar;