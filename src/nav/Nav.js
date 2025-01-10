// src/nav/Nav.js
import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import "../styles/nav.css";
import felho from "../assets/felhoeszti.png";

export default function Nav() {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getNavPositionClass = () => {
        switch (location.pathname) {
            case "/":
            case "/item1":
                return "nav-item1";
            case "/item2":
                return "nav-item2";
            case "/item3":
                return "nav-item3";
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

    const portfolioItemClass = () => {
        return ["nav-item1", "nav-item2", "nav-item3"].includes(navPositionClass) ? "nav-link current" : "nav-link";
    }

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
        const isCurrent = isCurrentPage(navClass);
        const linkClass = isCurrent ? "nav-link current" : "nav-link";

        return (
            <Link to={to} className={linkClass + " dropdown-item"}>
                <p>{title}</p>
            </Link>
        );
    };


    return (
        <div className="nav-parent">
            <img src={felho} alt="Felho" className="felho"/>
            <nav className={`nav ${navPositionClass}`}>
                <span className="nav-brand">@kondaszeszti</span>
                <div className="nav-links">
                    <div
                        className={portfolioItemClass()}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <p>portfolio</p>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                {renderDropdownItem("/item1", "nav-item1", "item1")}
                                {renderDropdownItem("/item2", "nav-item2", "item2")}
                                {renderDropdownItem("/item3", "nav-item3", "item3")}
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