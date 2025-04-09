import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from "../assets/eszti_assets/esztiviraglogo.png";
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

    const navItems = [
        {
            to: "/",
            defaultImg: home1,
            hoverImg: home3,
            activeImg: home2,
            alt: "Home"
        },
        {
            to: "/all-categories",
            defaultImg: mywork1,
            hoverImg: mywork3,
            activeImg: mywork2,
            alt: "My Work"
        },
        {
            to: "/about",
            defaultImg: about1,
            hoverImg: about3,
            activeImg: about2,
            alt: "About"
        },
        {
            to: "/contact",
            defaultImg: contact1,
            hoverImg: contact3,
            activeImg: contact2,
            alt: "Contact"
        }
    ];

    return (
        <>
            {/* Header */}
            <header className="bg-white border-b border-gray-100">
                <div className="flex flex-col items-center px-8 py-4">
                    {/* Logo - Centered at top */}
                    <Link to="/" className="hover:opacity-80 transition-opacity mb-4">
                        <img
                            src={logo}
                            alt="Eszti Logo"
                            className="h-20 w-auto transform hover:scale-105 transition-transform"
                        />
                    </Link>

                    {/* Desktop Navigation - Centered below logo */}
                    <div className="hidden md:flex gap-8">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => `flex items-center h-[1.5rem] min-w-[1.5rem]`}
                            >
                                {({ isActive }) => (
                                    <img
                                        src={isActive ? item.activeImg : item.defaultImg}
                                        alt={item.alt}
                                        className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                                        style={{ height: '1rem' }}
                                        onMouseOver={(e) => !isActive && (e.currentTarget.src = item.hoverImg)}
                                        onMouseOut={(e) => !isActive && (e.currentTarget.src = item.defaultImg)}
                                    />
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Hamburger Button (mobile only) - Positioned absolutely */}
                    <button
                        onClick={toggleDrawer}
                        className="md:hidden p-2 rounded-md absolute top-4 right-4"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div className={`
                fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-lg
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden
                transition-transform duration-300 ease-in-out
                pt-16
            `}>
                <nav className="flex flex-col gap-8 px-8 py-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({isActive}) => `flex items-center h-[1.5rem] min-w-[1.5rem]`}
                            onClick={() => setIsOpen(false)}
                        >
                            {({isActive}) => (
                                <img
                                    src={isActive ? item.activeImg : item.defaultImg}
                                    alt={item.alt}
                                    className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                                    style={{height: '1rem'}}
                                    onMouseOver={(e) => !isActive && (e.currentTarget.src = item.hoverImg)}
                                    onMouseOut={(e) => !isActive && (e.currentTarget.src = item.defaultImg)}
                                />
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={toggleDrawer}
                />
            )}
        </>
    );
}
