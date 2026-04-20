import React from "react";
import { Route,Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Myrecipe from "./components/Myrecipe";
import Favrecipe from "./components/Favrecipe";
import { BrowserRouter } from 'react-router-dom';
import Error from "./components/Error";


const App = () => {
  return (
    <div>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/myrecipes" element={<Myrecipe/>}/>
        <Route path="/favourites" element={<Favrecipe/>}/>
        <Route path="*" element={<Error/>}/>
      </Route>
    </Routes>
    </BrowserRouter>

    </div>
    
  );
};

export default App;
