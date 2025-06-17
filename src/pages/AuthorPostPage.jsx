import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const POSTS_PER_PAGE = 2;

const AuthorPostsPage = () => {
    const { authorID } = useParams();
    const [author, setAuthor] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('/authors.json')
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((a) => a.authorID === authorID);
                setAuthor(found);
            });
    }, [authorID]);

    useEffect(() => {
        fetch('/blogs.json')
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter((blog) => blog.authorID === authorID);
                setBlogs(filtered);
            });
    }, [authorID]);

    const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
    const visibleBlogs = blogs.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    if (!author) {
        return <div className="text-center py-10 text-xl">Author not found.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">
                Posts by {author.name}
            </h1>

            <div className="grid gap-4 md:grid-cols-2">
                {visibleBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            <div className="mt-10 text-right">
                <Link to={`/author/${authorID}`} className="btn btn-outline">
                    ⬅ Back to Profile
                </Link>
            </div>
        </div>
    );
};

export default AuthorPostsPage;
