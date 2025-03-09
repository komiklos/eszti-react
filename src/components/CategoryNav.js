import { NavLink, Link } from 'react-router-dom';
import logo from "../assets/eszti_logo.png";

export default function CategoryNav() {
    return (
        <nav className="flex items-center gap-8 px-8 py-6 border-b border-gray-100">
            {/* Logo */}
            <Link to="/" className="hover:opacity-80 transition-opacity p-0 -my-3">
                <img
                    src={logo}
                    alt="Eszti Logo"
                    className="h-10 md:h-12 lg:h-14 w-auto transform hover:scale-105 transition-transform p-0"
                />
            </Link>

            {/* My Work Link */}
            <NavLink
                to="/all-categories"
                className={({ isActive }) =>
                    `text-gray-600 transition-colors text-lg
         ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-300'}`
                }
            >
                Categories
            </NavLink>

            {/* Regular Links */}
            <div className="flex gap-6">
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `text-gray-600 transition-colors text-lg
                         ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-300'}`
                    }
                >
                    About
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `text-gray-600 transition-colors text-lg
                         ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-300'}`
                    }
                >
                    Contact
                </NavLink>
            </div>

            {/* Admin Link */}
            <NavLink
                to="/admin"
                className={({ isActive }) =>
                    `ml-auto text-red-500 transition-colors font-bold text-lg
                     ${isActive ? 'text-red-600' : 'hover:text-red-400'}`
                }
            >
                Admin
            </NavLink>
        </nav>
    );
}
