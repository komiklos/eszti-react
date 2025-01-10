// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './nav/Nav';
import Item1Gallery from './pages/portfolio/Item1Gallery';
import Item2Gallery from './pages/portfolio/Item2Gallery';
import Item3Gallery from './pages/portfolio/Item3Gallery';
import Shop from "./pages/shop/Shop.js";
import About from "./pages/about/About.js";
import Links from "./pages/links/Links.js";
import './styles/app.css';

function App() {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/item1" element={<Item1Gallery />} />
                <Route path="/item2" element={<Item2Gallery />} />
                <Route path="/item3" element={<Item3Gallery />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/links" element={<Links />} />
                <Route path="/" element={<Item1Gallery />} />
            </Routes>
        </Router>
    );
}

export default App;