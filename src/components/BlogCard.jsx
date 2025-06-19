import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        fetch('/authors.json')
            .then((res) => res.json())
            .then((data) => {
                const found = data.find(a => a.authorID === blog.authorID && a.isActive);
                if (found) setAuthor(found);
            });
    }, [blog.authorID]);

    return (
        <div className="card bg-zinc-900 shadow-md hover:shadow-xl transition hover:contrast-105 hover:scale-102 duration-300">
            <figure>
                <img
                    src={blog.coverImg}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg">{blog.title}</h2>

                {author && (
                    <p className="text-sm text-gray-500">
                        By{" "}
                        <Link
                            to={`/author/${blog.authorID}`}
                            className="link link-hover text-primary"
                        >
                            {author.name}
                        </Link>{" "}
                        on {blog.date}
                    </p>
                )}

                <p>{blog.summary}</p>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {blog.tags.map((tag, i) => (
                            <Link
                                to={`/category/${tag}`}
                                key={i}
                                className="badge badge-outline badge-sm hover:badge-primary"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                )}
                {console.log(blog)}
                

                <div className="card-actions justify-end mt-4">
                    <Link to={`/blog/${blog.id}`} className="btn bg-lime-600 text-black btn-sm">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
