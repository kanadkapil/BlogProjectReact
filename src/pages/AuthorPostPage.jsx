import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const POSTS_PER_PAGE = 9;

const AuthorPostsPage = () => {
    const { authorID } = useParams();
    const [author, setAuthor] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('/authors.json')
            .then((res) => res.json())
            .then((data) => {
                setAuthor(data.find(a => a.authorID === authorID) || null);
            })
            .catch(console.error);
    }, [authorID]);

    useEffect(() => {
        fetch('/blogs.json')
            .then((res) => res.json())
            .then((data) => {
                // Fetch only posts by this author
                setBlogs(data.filter(blog => blog.authorID === authorID));
            })
            .catch(console.error);
    }, [authorID]);

    const totalPages = useMemo(
        () => Math.ceil(blogs.length / POSTS_PER_PAGE),
        [blogs]
    );

    const visibleBlogs = useMemo(
        () => blogs.slice(
            (currentPage - 1) * POSTS_PER_PAGE,
            currentPage * POSTS_PER_PAGE
        ),
        [blogs, currentPage]
    );

    if (!author) {
        return (
            <div className="text-center py-10 text-xl">Author not found.</div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">
                Posts by {author.name}
            </h1>

            {blogs.length === 0 ? (
                <h6 className="text-center text-3xl text-gray-400 py-20">
                    No post yet...! 😶
                </h6>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-3">
                        {visibleBlogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6 gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </>
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
