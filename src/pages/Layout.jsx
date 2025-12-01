import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Lazy load pages
const Home = lazy(() => import("./Home"));
const BlogDetails = lazy(() => import("./BlogDetails"));
const NotFound = lazy(() => import("./NotFound"));
const CategoryPage = lazy(() => import("./CategoryPage"));
const AuthorsList = lazy(() => import("./AuthorsList"));
const AuthorProfile = lazy(() => import("./AuthorProfile"));
const AuthorPostsPage = lazy(() => import("./AuthorPostPage"));
const Login = lazy(() => import("./Login"));

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
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-[50vh]">
                <span className="loading loading-spinner loading-lg text-lime-500"></span>
              </div>
            }
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/author/:authorID" element={<AuthorProfile />} />
              <Route
                path="/author/:authorID/posts"
                element={<AuthorPostsPage />}
              />
              <Route path="/authors" element={<AuthorsList />} />
              <Route path="/category/:tagName" element={<CategoryPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
