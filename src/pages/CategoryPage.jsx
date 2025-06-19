import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import BlogCard from '../components/BlogCard';

const CategoryPage = () => {
  const { tagName } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/blogs.json')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(console.error);
  }, []);

  // ✅ UseMemo for efficient filtering
  const filtered = useMemo(() => {
    return blogs.filter(blog =>
      blog.tags && blog.tags.includes(tagName)
    );
  }, [blogs, tagName]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🗂 Blogs Tagged with <span className="text-primary">#{tagName}</span>
      </h2>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found for this tag.</p>
      )}
    </div>
  );
};

export default CategoryPage;
