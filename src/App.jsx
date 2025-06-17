import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import AuthorProfile from './pages/AuthorProfile'; // Import it


function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog/:id" element={<BlogDetails />} />
                    <Route path="*" element={<NotFound />} /> {/* ⬅️ Catch-all route */}
                    <Route path="/author/:authorID" element={<AuthorProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
