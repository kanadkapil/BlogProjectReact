import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const [authorName, setAuthorName] = useState("");

    useEffect(() => {
        fetch('/authors.json')
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((a) => a.authorID === blog.authorID);
                if (found) setAuthorName(found.name);
            });
    }, [blog.authorID]);

    return (
        <div className="card bg-base-100 shadow-md border">
            <figure>
                <img src={blog.coverImg} alt={blog.title} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p className="text-sm text-gray-500">
                    By{" "}
                    <Link to={`/author/${blog.authorID}`} className="link link-hover text-primary">
                        {authorName}
                    </Link>{" "}
                    on {blog.date}
                </p>
                <p>{blog.summary}</p>
                <div className="card-actions justify-end mt-4">
                    <Link to={`/blog/${blog.id}`} className="btn btn-primary btn-sm">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
