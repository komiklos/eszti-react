import React from "react";
import Nav from "./nav/Nav.js";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Portfolio from "./pages/portfolio/Portfolio.js";
import Shop from "./pages/shop/Shop.js";
import About from "./pages/about/About.js";
import Links from "./pages/links/Links.js";

import "./styles/app.css";

const App = () => {
    return (
        <Router>
            <Nav/>
            <Routes>
                <Route path="/" element={<Portfolio />}/>
                <Route path="/shop" element={<Shop />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/links" element={<Links />}/>
            </Routes>
        </Router>
    );
};

export default App;
