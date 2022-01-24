import React from 'react';
import {Route, Routes} from "react-router-dom";
import Winners from "./pages/Winners/Winners";
import Garage from "./pages/Garage/Garage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Garage/>} />
      <Route path="/winners" element={<Winners/>} />
    </Routes>
  );
};

export default AppRouter;