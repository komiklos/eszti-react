import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="space-y-3">
                    <h1 className="text-9xl font-bold text-gray-800">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-500">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg
          hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;