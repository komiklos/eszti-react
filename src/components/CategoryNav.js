import { Link } from 'react-router-dom';

const CATEGORIES = [
    { slug: 'kids-editorial', displayName: 'Kids Editorial' },
    { slug: 'editorial', displayName: 'Editorial' },
    { slug: 'ceramics', displayName: 'Ceramics' },
    { slug: 'paintings', displayName: 'Paintings' },
    { slug: 'personal-projects', displayName: 'Personal Projects' }
];

export default function CategoryNav() {
    return (
        <nav className="flex flex-wrap gap-2 p-4 bg-white shadow">
            {CATEGORIES.map((cat) => (
                <Link
                    key={cat.slug}
                    to={`/${cat.slug}`}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                    {cat.displayName}
                </Link>
            ))}
            <Link
                to="/admin"
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 ml-auto"
            >
                Admin
            </Link>
        </nav>
    );
}