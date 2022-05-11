import React, { useEffect, useRef, useState } from "react";
// import fire from './fire.js';
import Login from "./Login.js";
import Hero from "./Hero.js";
import "./App.css";
import { initializeApp } from "firebase/app";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./Routes.js";

const App = () => {
    const routing = useRoutes(routes);

    return <>{routing}</>;
};
export default App;
