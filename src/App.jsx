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
        <Router>
            {/* navbar component */}
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog/:id" element={<BlogDetails />} />
                    <Route path="*" element={<NotFound />} /> {/* ⬅️ Catch-all route */}
                    <Route path="/author/:authorID" element={<AuthorProfile />} />
                    <Route path="/author/:authorID/posts" element={<AuthorPostsPage />} />

                    <Route path="/authors" element={<AuthorsList />} />

                    <Route path="/category/:tagName" element={<CategoryPage />} />


                </Routes>
            </div>
            {/* <Footer /> */}
            <Footer />
        </Router>
    );
}

export default App;
