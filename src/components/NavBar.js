import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from "../assets/eszti_logo.png";
import about1 from "../assets/eszti_assets/about1.png";
import about2 from "../assets/eszti_assets/about2.png";
import about3 from "../assets/eszti_assets/about3.png";
import contact1 from "../assets/eszti_assets/contact1.png";
import contact2 from "../assets/eszti_assets/contact2.png";
import contact3 from "../assets/eszti_assets/contact3.png";
import mywork1 from "../assets/eszti_assets/mywork1.png";
import mywork2 from "../assets/eszti_assets/mywork2.png";
import mywork3 from "../assets/eszti_assets/mywork3.png";
import home1 from "../assets/eszti_assets/home1.png";
import home2 from "../assets/eszti_assets/home2.png";
import home3 from "../assets/eszti_assets/home3.png";
import { FiMenu, FiX } from 'react-icons/fi';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Hamburger Button */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={toggleDrawer}
                    className="p-2 rounded-md bg-white shadow-md"
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Drawer/Navbar */}
            <div className={`
                fixed md:static inset-y-0 left-0 z-40
                w-64 md:w-auto bg-white shadow-lg md:shadow-none
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                transition-transform duration-300 ease-in-out
            `}>
                <nav className="flex flex-col md:flex-row items-start md:items-center gap-8 px-8 py-6 border-b border-gray-100 h-full">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="hover:opacity-80 transition-opacity p-0 -my-3"
                        onClick={() => setIsOpen(false)}
                    >
                        <img
                            src={logo}
                            alt="Eszti Logo"
                            className="h-10 md:h-12 lg:h-14 w-auto transform hover:scale-105 transition-transform p-0"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex flex-col md:flex-row gap-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `flex items-center h-[1.5rem] min-w-[1.5rem]`}
                            onClick={() => setIsOpen(false)}
                        >
                            {({ isActive }) => (
                                <div className="relative h-full w-auto flex-none">
                                    <img
                                        src={isActive ? home2 : home1}
                                        alt="Home"
                                        className="h-full w-auto object-contain block transition-transform duration-300 hover:scale-105"
                                        style={{
                                            height: '1rem',
                                            width: 'auto',
                                            minWidth: '1.5rem'
                                        }}
                                        onMouseOver={(e) => !isActive && (e.currentTarget.src = home3)}
                                        onMouseOut={(e) => !isActive && (e.currentTarget.src = home1)}
                                    />
                                </div>
                            )}
                        </NavLink>

                        <NavLink
                            to="/all-categories"
                            className={() => `flex items-center h-[1.5rem] min-w-[1.5rem]`}
                            onClick={() => setIsOpen(false)}
                        >
                            {({ isActive }) => (
                                <div className="relative h-full w-auto flex-none">
                                    <img
                                        src={isActive ? mywork2 : mywork1}
                                        alt="Home"
                                        className="h-full w-auto object-contain block transition-transform duration-300 hover:scale-105"
                                        style={{
                                            height: '1rem',
                                            width: 'auto',
                                            minWidth: '1.5rem'
                                        }}
                                        onMouseOver={(e) => !isActive && (e.currentTarget.src = mywork3)}
                                        onMouseOut={(e) => !isActive && (e.currentTarget.src = mywork1)}
                                    />
                                </div>
                            )}
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) => `flex items-center h-[1.5rem] min-w-[1.5rem]`}
                            onClick={() => setIsOpen(false)}
                        >
                            {({ isActive }) => (
                                <div className="relative h-full w-auto flex-none">
                                    <img
                                        src={isActive ? about2 : about1}
                                        alt="Home"
                                        className="h-full w-auto object-contain block transition-transform duration-300 hover:scale-105"
                                        style={{
                                            height: '1rem',
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
                            className={({ isActive }) => `flex items-center h-[1.5rem] min-w-[1.5rem]`}
                            onClick={() => setIsOpen(false)}
                        >
                            {({ isActive }) => (
                                <div className="relative h-full w-auto flex-none">
                                    <img
                                        src={isActive ? contact2 : contact1}
                                        alt="Home"
                                        className="h-full w-auto object-contain block transition-transform duration-300 hover:scale-105"
                                        style={{
                                            height: '1rem',
                                            width: 'auto',
                                            minWidth: '1.5rem'
                                        }}
                                        onMouseOver={(e) => !isActive && (e.currentTarget.src = contact3)}
                                        onMouseOut={(e) => !isActive && (e.currentTarget.src = contact1)}
                                    />
                                </div>
                            )}
                        </NavLink>
                    </div>
                </nav>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleDrawer}
                />
            )}
        </>
    );
}
