import { NavLink, Link } from 'react-router-dom';
import logo from "../assets/eszti_logo.png";
import menu1 from "../assets/eszti_assets/menu1.png";
import menu2 from "../assets/eszti_assets/menu2.png";
import menu3 from "../assets/eszti_assets/menu3.png";
import about1 from "../assets/eszti_assets/about1.png";
import about2 from "../assets/eszti_assets/about2.png";
import about3 from "../assets/eszti_assets/about3.png";

export default function NavBar() {
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

            {/* Home Link (Image Version) */}
            <NavLink
                to="/"
                className={({ isActive }) => `flex items-center h-[1.5rem] min-w-[1.5rem]`}
            >
                {({ isActive }) => (
                    <div className="relative h-full w-auto flex-none">
                        <img
                            src={isActive ? menu2 : menu1}
                            alt="Home"
                            className="h-full w-auto object-contain block transition-transform duration-300 hover:scale-105"
                            style={{
                                height: '1.5rem',
                                width: 'auto',
                                minWidth: '1.5rem'
                            }}
                            onMouseOver={(e) => !isActive && (e.currentTarget.src = menu3)}
                            onMouseOut={(e) => !isActive && (e.currentTarget.src = menu1)}
                        />
                    </div>
                )}
            </NavLink>

            {/* Categories Link */}
            <NavLink
                to="/all-categories"
                className={({ isActive }) =>
                    `text-gray-600 transition-colors text-lg
                    ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-300'}`
                }
            >
                Categories
            </NavLink>

            {/* Other Links */}
            <NavLink
                to="/about"
                className={({ isActive }) => `flex items-center h-[1.5rem] min-w-[1.5rem]`}
            >
                {({ isActive }) => (
                    <div className="relative h-full w-auto flex-none">
                        <img
                            src={isActive ? about2 : about1}
                            alt="Home"
                            className="h-full w-auto object-contain block transition-transform duration-300 hover:scale-105"
                            style={{
                                height: '1.5rem',
                                width: 'auto',
                                minWidth: '1.5rem'
                            }}
                            onMouseOver={(e) => !isActive && (e.currentTarget.src = about3)}
                            onMouseOut={(e) => !isActive && (e.currentTarget.src = about1)}
                        />
                    </div>
                )}
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
        </nav>
    );
}
