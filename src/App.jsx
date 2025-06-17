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
import Beams from './components/Beams'; // ✅ Beams component

function App() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* 🔴 Beams Background */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Beams
                    beamWidth={2.7}
                    beamHeight={25}
                    beamNumber={29}
                    lightColor="#ffffff"
                    speed={6}
                    noiseIntensity={3.75}
                    scale={0.4}
                    rotation={95}
                />
            </div>

            <Router>
                {/* 🔵 Navbar stays above the background */}
                <Navbar />

                {/* 🔵 Page content */}
                <div className="container mx-auto px-4 py-6 relative z-10">
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
