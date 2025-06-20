import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import BlogDetails from './BlogDetails';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import CategoryPage from './CategoryPage';
import AuthorsList from './AuthorsList';
import AuthorProfile from './AuthorProfile';
import AuthorPostsPage from './AuthorPostPage';
import Login from './Login';



function App() {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat "
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg')",
            }}
        >
            <Router>
                <Navbar />

                <div className="max-w-7xl mx-auto px-4 py-6 my-5 backdrop-blur-sm min-h-[80vh] rounded-xl shadow-lg bg-black/30">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/blog/:id" element={<BlogDetails />} />
                        <Route path="/author/:authorID" element={<AuthorProfile />} />
                        <Route path="/author/:authorID/posts" element={<AuthorPostsPage />} />
                        <Route path="/authors" element={<AuthorsList />} />
                        <Route path="/category/:tagName" element={<CategoryPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>

                <Footer />
            </Router>
        </div>
    );
}

export default App;
