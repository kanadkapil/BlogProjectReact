import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch('/blogs.json')
            .then(res => res.json())
            .then(data => {
                const tagSet = new Set();
                data.forEach(blog => {
                    blog.tags?.forEach(tag => tagSet.add(tag));
                });
                setTags(Array.from(tagSet));
            });
    }, []);

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">📝 Mini Blog</Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/authors">Authors</Link></li>

                    <li>
                        <details>
                            <summary>Categories</summary>
                            <ul className="p-2 bg-base-100 shadow z-10">
                                {tags.length > 0 ? (
                                    tags.map((tag, index) => (
                                        <li key={index}>
                                            <Link to={`/category/${tag}`}>#{tag}</Link>
                                        </li>
                                    ))
                                ) : (
                                    <li><span className="text-xs text-gray-400 px-2">No tags</span></li>
                                )}
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
