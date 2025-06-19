import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [tags, setTags] = useState([]);
    const location = useLocation();

    // Get the current active path
    const path = location.pathname;

    // Determine the active tag (if any)
    const activeTag = path.startsWith('/category/')
        ? decodeURIComponent(path.replace('/category/', ''))
        : null;

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

    // Utility function to apply active styles
    const getLinkClass = (isActive) =>
        isActive ? 'bg-lime-600 text-black font-semibold rounded-md px-3 py-1' : 'px-3 py-1';

    return (
        <div className="navbar backdrop-blur-sm shadow-md z-50 sticky top-0">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-2xl">📝 Mini Blog</Link>
            </div>

            <div className="flex-none gap-4">
                <Link
                    to="/"
                    className={getLinkClass(path === '/')}
                >
                    Home
                </Link>

                <Link
                    to="/authors"
                    className={getLinkClass(path === '/authors')}
                >
                    Authors
                </Link>

                {/* Categories Dropdown */}
                <div className="dropdown dropdown-end z-[50]">
                    <label tabIndex={0} className="btn btn-ghost">
                        Categories
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-zinc-950 rounded-box w-52 max-h-64 overflow-y-auto z-[50]"
                    >
                        {tags.length > 0 ? (
                            tags.map((tag, index) => {
                                const isActive = activeTag === tag;
                                return (
                                    <li key={index}>
                                        <Link
                                            to={`/category/${tag}`}
                                            className={getLinkClass(isActive)}
                                        >
                                            #{tag}
                                        </Link>
                                    </li>
                                );
                            })
                        ) : (
                            <li>
                                <span className="text-xs text-gray-400 px-2">No tags</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
