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
            case "/category1":
                return "nav-category1";
            case "/category2":
                return "nav-category2";
            case "/category3":
                return "nav-category3";
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
            case "/category1":
                return "category1";
            case "/category2":
                return "category2";
            case "/category3":
                return "category3";
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
        return ["nav-category1", "nav-category2", "nav-category3"].includes(navPositionClass) ? "nav-link current" : "nav-link";
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
                                {renderDropdownItem("/category1", "nav-category1", "category1")}
                                {renderDropdownItem("/category2", "nav-category2", "category2")}
                                {renderDropdownItem("/category3", "nav-category3", "category3")}
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