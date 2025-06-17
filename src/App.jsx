import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import CategoryPage from './pages/CategoryPage';
import AuthorsList from './pages/AuthorsList';
import AuthorProfile from './pages/AuthorProfile';
import AuthorPostsPage from './pages/AuthorPostPage';

function App() {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg')",
            }}
        >
            <Router>
                {/* 🔵 Navbar */}
                <Navbar />

                {/* 🔵 Page content */}
                <div className="container mx-auto px-4 py-6 my-5 backdrop-blur-sm min-h-screen rounded-xl shadow-md">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog/:id" element={<BlogDetails />} />
                        <Route path="/author/:authorID" element={<AuthorProfile />} />
                        <Route path="/author/:authorID/posts" element={<AuthorPostsPage />} />
                        <Route path="/authors" element={<AuthorsList />} />
                        <Route path="/category/:tagName" element={<CategoryPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>

                {/* 🔵 Footer */}
                <Footer />
            </Router>
        </div>
    );
}

export default App;
