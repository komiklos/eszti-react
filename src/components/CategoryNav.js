import { NavLink } from 'react-router-dom';

const CATEGORIES = [
    { slug: 'kids-editorial', displayName: 'Kids Editorial' },
    { slug: 'editorial', displayName: 'Editorial' },
    { slug: 'ceramics', displayName: 'Ceramics' },
    { slug: 'paintings', displayName: 'Paintings' },
    { slug: 'personal-projects', displayName: 'Personal Projects' }
];

export default function CategoryNav() {
    return (
        <nav className="flex items-center gap-8 px-8 py-4 border-b border-gray-100">
            {/* My Work Dropdown */}
            <div className="relative group">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-1 text-gray-600 hover:text-blue-300 transition-colors
                         ${isActive ? 'text-blue-600 font-bold' : ''}`
                    }
                >
                    My Work
                    <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </NavLink>

                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible
                             transition-all duration-200 origin-top
                             border border-gray-100 z-50">
                    {CATEGORIES.map((cat) => (
                        <NavLink
                            key={cat.slug}
                            to={`/${cat.slug}`}
                            className={({ isActive }) =>
                                `block px-4 py-2.5 text-sm 
                                ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'} 
                                transition-colors`
                            }
                        >
                            {cat.displayName}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Regular Links */}
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    `text-gray-600 transition-colors
                     ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-300'}`
                }
            >
                About
            </NavLink>

            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    `text-gray-600 transition-colors
                     ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-300'}`
                }
            >
                Contact
            </NavLink>

            {/* Admin Link - Moved to right */}
            <NavLink
                to="/admin"
                className={({ isActive }) =>
                    `ml-auto text-sm ${isActive ? 'text-red-600' : 'text-red-500'} 
                     hover:text-red-700 transition-colors font-bold`
                }
            >
                Admin
            </NavLink>
        </nav>
    );
}