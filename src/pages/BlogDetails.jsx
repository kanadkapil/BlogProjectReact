import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        fetch('/blogs.json')
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((b) => b.id === parseInt(id));
                setBlog(found);
            });
    }, [id]);

    useEffect(() => {
        if (blog?.authorID) {
            fetch('/authors.json')
                .then((res) => res.json())
                .then((data) => {
                    // const found = data.find((a) => a.authorID === blog.authorID && a.isActive === "true");
                    const found = data.find(a => a.authorID === blog.authorID && a.isActive);

                    if (found) setAuthor(found);
                });
        }
    }, [blog]);

    if (!blog) {
        return <div className="text-center py-10 text-lg">Blog not found.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-zinc-900 shadow p-6 rounded-lg my-6">
            <img
                src={blog.coverImg}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>

            {author && (
                <p className="text-sm text-gray-500 mb-4">
                    By{" "}
                    <Link to={`/author/${blog.authorID}`} className="link link-hover text-primary">
                        {author.name}
                    </Link>{" "}
                    on {blog.date}
                </p>
            )}

            <p className="text-lg mb-4">{blog.content}</p>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-semibold mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, i) => (
                            <Link
                                to={`/category/${tag}`}
                                key={i}
                                className="badge badge-outline hover:badge-primary"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-6">
                <Link to="/" className="btn btn-outline btn-primary">
                    ⬅ Back to Home
                </Link>
            </div>
        </div>
    );
};

export default BlogDetails;
