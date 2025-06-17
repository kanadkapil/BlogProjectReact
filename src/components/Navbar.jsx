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
        <div className="navbar backdrop-blur-sm shadow-md z-50 sticky top-0">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-md sm:text-3xl">📝 Mini Blog</Link>
            </div>

            <div className="flex-none gap-4">
                <Link to="/" className="btn btn-ghost">Home</Link>
                <Link to="/authors" className="btn btn-ghost">Authors</Link>

                {/* Categories Dropdown */}
                <div className="dropdown dropdown-end z-[50]">
                    <label tabIndex={0} className="btn btn-ghost">
                        Categories
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-64 overflow-y-auto z-[50]"
                    >
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
                </div>
            </div>
        </div>
    );
};

export default Navbar;
