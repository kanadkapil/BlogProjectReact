import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [authorName, setAuthorName] = useState("");

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
                    const found = data.find((a) => a.authorID === blog.authorID);
                    if (found) setAuthorName(found.name);
                });
        }
    }, [blog]);

    if (!blog) return <div className="text-center py-10">Blog not found.</div>;

    return (
        <div className="max-w-3xl mx-auto bg-base-100 shadow p-6 rounded-lg">
            <img src={blog.coverImg} alt={blog.title} className="w-full h-64 object-cover rounded-md mb-4" />
            <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
                By{" "}
                <Link to={`/author/${blog.authorID}`} className="link link-hover text-primary">
                    {authorName}
                </Link>{" "}
                on {blog.date}
            </p>
            <p className="text-lg">{blog.content}</p>

            <div className="mt-6">
                <Link to="/" className="btn btn-outline btn-primary">
                    ⬅ Back to Home
                </Link>
            </div>
        </div>
    );
};

export default BlogDetails;
