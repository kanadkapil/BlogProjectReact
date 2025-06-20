import { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // ✅ Auth context import

const Navbar = () => {
    const [tags, setTags] = useState([]);
    const location = useLocation();
    const path = location.pathname;
    const { user, authorData, logout } = useContext(AuthContext); // ✅ Include authorData from context
    const navigate = useNavigate();

    const activeTag = path.startsWith('/category/')
        ? decodeURIComponent(path.replace('/category/', ''))
        : null;

    useEffect(() => {
        const loadTags = async () => {
            try {
                const res = await fetch('/blogs.json');
                const data = await res.json();
                const tagSet = new Set();
                data.forEach(blog => blog.tags?.forEach(tag => tagSet.add(tag)));
                setTags(Array.from(tagSet));
            } catch (error) {
                console.error('Error loading tags:', error);
            }
        };
        loadTags();
    }, []);

    const getLinkClass = (isActive) =>
        isActive ? 'bg-lime-600 text-black font-semibold rounded-md px-3 py-1' : 'px-3 py-1';

    return (
        <div className="navbar backdrop-blur-sm bg-black/30 shadow-md z-50 sticky top-0">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-lg sm:text-3xl">📝 Blog</Link>
            </div>

            <div className="flex-none gap-4 items-center">
                <Link to="/" className={getLinkClass(path === '/')}>Home</Link>
                <Link to="/authors" className={getLinkClass(path === '/authors')}>Authors</Link>

                {/* 🔻 Categories Dropdown */}
                <div className="dropdown dropdown-end z-[50]">
                    <label tabIndex={0} className="btn btn-ghost">Categories</label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-zinc-950 rounded-box w-52 max-h-64 overflow-y-auto z-[50]"
                    >
                        {tags.length > 0 ? (
                            tags.map((tag, index) => {
                                const isActive = activeTag === tag;
                                return (
                                    <li key={index}>
                                        <Link to={`/category/${tag}`} className={getLinkClass(isActive)}>
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

                {/* 🔐 User Authentication Dropdown */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-lime-600 ring-offset-base-100 ring-offset-2">
                                <img
                                    src={authorData?.picA || '/default-avatar.png'}
                                    alt="profile"
                                />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[60] p-4 shadow backdrop-blur-sm bg-black/30 rounded-box w-52">
                            <li>
                                <Link to={`/author/${user.authorID}`}>👤 View Profile</Link>
                            </li>
                            <li>
                                <Link to={`/author/${user.authorID}/posts`}>📚 All Posts</Link>
                            </li>
                            <li>
                                <button onClick={() => logout()}>🚪 Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-sm btn-outline">Sign In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
