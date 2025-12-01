import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const blogsPerPage = 9;

  useEffect(() => {
    fetch('/blogs.json')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(console.error);
  }, []);

  // Filter blogs based on search query
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const filteredBlogs = blogs.filter((blog) => {
    if (!searchQuery) return true;
    return (
      blog.title.toLowerCase().includes(searchQuery) ||
      blog.summary.toLowerCase().includes(searchQuery) ||
      blog.content?.toLowerCase().includes(searchQuery) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(searchQuery))
    );
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfLastBlog - blogsPerPage, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Blog page'}
      </h1>
      
      {filteredBlogs.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">
            <p className="text-2xl">No blogs found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
