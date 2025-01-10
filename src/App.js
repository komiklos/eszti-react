// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './nav/Nav';
import Category1Gallery from './pages/portfolio/Category1Gallery';
import Category2Gallery from './pages/portfolio/Category2Gallery';
import Category3Gallery from './pages/portfolio/Category3Gallery';
import Shop from "./pages/shop/Shop.js";
import About from "./pages/about/About.js";
import Links from "./pages/links/Links.js";
import './styles/app.css';

function App() {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/category1" element={<Category1Gallery />} />
                <Route path="/category2" element={<Category2Gallery />} />
                <Route path="/category3" element={<Category3Gallery />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/links" element={<Links />} />
                <Route path="/" element={<Category1Gallery />} />
            </Routes>
        </Router>
    );
}

export default App;