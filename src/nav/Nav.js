import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/nav.css";
import felho from "../assets/felhoeszti.png";

export default function Nav() {
  const location = useLocation();

  const getNavPositionClass = () => {
    switch (location.pathname) {
      case "/":
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
  const currentPageTitle = getCurrentPageTitle();

  const isCurrentPage = (navClass) => {
    return navClass === navPositionClass;
  };

  const renderNavLink = (to, navClass, title) => {
    const isCurrent = isCurrentPage(navClass);
    const linkClass = isCurrent ? "nav-link current" : "nav-link";

    return (
      <Link to={to} className={linkClass}>
        <p>{title}</p>
        {/* {isCurrent && <h1 className="page-title">{currentPageTitle}</h1>} */}
      </Link>
    );
  };

  return (
    <div className="nav-parent">
      <img src={felho} alt="Felho" className="felho" />
      <nav className={`nav ${navPositionClass}`}>
        <span className="nav-brand">@kondaszeszti</span>
        <div className="nav-links">
          {renderNavLink("/", "nav-portfolio", "portfolio")}
          {renderNavLink("/shop", "nav-shop", "shop")}
          {renderNavLink("/about", "nav-about", "about")}
          {renderNavLink("/links", "nav-links", "links")}
        </div>
      </nav>
    </div>
  );
}
