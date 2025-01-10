// src/nav/Nav.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/nav.css";
import felho from "../assets/felhoeszti.png";

export default function Nav() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getNavPositionClass = () => {
    switch (location.pathname) {
      case "/":
      case "/item1":
      case "/item2":
      case "/item3":
        return "nav-portfolio";
      case "/shop":
        return "nav-shop";
      case "/about":
        return "nav-about";
      case "/links":
        return "nav-links";
      default:
        return "";
    }
  };

  const getCurrentPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "portfolio";
      case "/item1":
        return "item1";
      case "/item2":
        return "item2";
      case "/item3":
        return "item3";
      case "/shop":
        return "shop";
      case "/about":
        return "about";
      case "/links":
        return "links";
      default:
        return "";
    }
  };

  const navPositionClass = getNavPositionClass();

  const isCurrentPage = (navClass) => {
    return navClass === navPositionClass;
  };

  const renderNavLink = (to, navClass, title) => {
    const isCurrent = isCurrentPage(navClass);
    const linkClass = isCurrent ? "nav-link current" : "nav-link";

    return (
        <Link to={to} className={linkClass}>
          <p>{title}</p>
        </Link>
    );
  };

  const renderDropdownItem = (to, navClass, title) => {
    const linkClass = "nav-link";
    return (
        <Link to={to} className={linkClass}>
          <p>{title}</p>
        </Link>
    );
  };


  return (
      <div className="nav-parent">
        <img src={felho} alt="Felho" className="felho" />
        <nav className={`nav ${navPositionClass}`}>
          <span className="nav-brand">@kondaszeszti</span>
          <div className="nav-links">
            <div
                className="nav-link"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <p>portfolio</p>
              {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {renderDropdownItem("/item1", "nav-portfolio", "item1")}
                    {renderDropdownItem("/item2", "nav-portfolio", "item2")}
                    {renderDropdownItem("/item3", "nav-portfolio", "item3")}
                  </div>
              )}
            </div>
            {renderNavLink("/shop", "nav-shop", "shop")}
            {renderNavLink("/about", "nav-about", "about")}
            {renderNavLink("/links", "nav-links", "links")}
          </div>
        </nav>
      </div>
  );
}