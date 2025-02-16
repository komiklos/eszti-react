import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import AdminGate from './components/AdminGate';
import CategoryNav from './components/CategoryNav';
import Gallery from './components/Gallery';
import UploadForm from './components/UploadForm';

export default function App() {
    const [user] = useAuthState(auth);

    return (
        <Router>
            <CategoryNav />

            <Routes>
                {/* Redirect root to default category */}
                <Route path="/" element={<Navigate to="/kids-editorial" replace />} />

                {/* Category gallery */}
                <Route path="/:slug" element={<Gallery />} />

                {/* Admin upload */}
                <Route path="/admin" element={
                    user ? <UploadForm /> : <AdminGate />
                } />
            </Routes>
        </Router>
    );
}