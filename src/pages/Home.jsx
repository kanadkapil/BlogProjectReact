import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/blogs.json')
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.error("Failed to load blogs:", err));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Home;
