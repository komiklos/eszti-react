import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import AdminGate from './components/AdminGate';
import CategoryNav from './components/CategoryNav';
import Gallery from './components/Gallery';
import UploadForm from './components/UploadForm';
import LoadingSpinner from './components/LoadingSpinner'; // Add a spinner component
import NotFoundPage from './components/NotFoundPage'; // Add a spinner component

export default function App() {
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Router>
            <CategoryNav />
            <Routes>
                <Route path="/" element={<Navigate to="/kids-editorial" replace />} />
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