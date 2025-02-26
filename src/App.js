// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import AdminGate from './components/AdminGate';
import UploadForm from './components/UploadForm';
import CategoryNav from './components/CategoryNav';
import Gallery from './components/Gallery';
import AllCategoriesGallery from './components/AllCategoriesGallery';
import LoadingSpinner from './components/LoadingSpinner';
import NotFoundPage from './components/NotFoundPage';
import './styles/app.css';


export default function App() {
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Router>
            <CategoryNav />
            <Routes>
                <Route path="/" element={<AllCategoriesGallery />} />
                <Route path="/:slug" element={<Gallery />} />
                <Route
                    path="/admin"
                    element={user ? <UploadForm /> : <AdminGate />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}