// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminGate from './components/AdminGate';
import UploadForm from './components/UploadForm';
import NavBar from './components/NavBar';
import Gallery from './components/Gallery';
import AllCategoriesGallery from './components/AllCategoriesGallery';
import LoadingSpinner from './components/LoadingSpinner';
import NotFoundPage from './components/NotFoundPage';
import FeaturedGallery from './components/FeaturedGallery';
import About from './components/About';
import Footer from './components/Footer';
import './styles/app.css';
import Contact from "./components/Contact";

export default function App() {
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;

    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    return (
        <div className="min-h-screen flex flex-col"> {/* Added wrapper div */}
            <Router>
                <NavBar />
                <main className="flex-grow"> {/* Added main with flex-grow */}
                    <Routes>
                        <Route path="/" element={<FeaturedGallery />} />
                        <Route path="/all-categories" element={<AllCategoriesGallery />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/:slug" element={<Gallery />} />
                        <Route
                            path="/admin"
                            element={user ? <UploadForm /> : <AdminGate />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <ToastContainer />
                <Footer />
            </Router>
        </div>
    );
}
