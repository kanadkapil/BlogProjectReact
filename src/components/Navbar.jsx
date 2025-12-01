import { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const [tags, setTags] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const path = location.pathname;
    const { user, authorData, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Search State - Initialize from URL
    const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('search') || '');

    // Enforce Dark Mode
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }, []);

    const activeTag = path.startsWith('/category/')
        ? decodeURIComponent(path.replace('/category/', ''))
        : null;

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch('/blogs.json');
                const data = await res.json();
                
                const tagSet = new Set();
                data.forEach(blog => blog.tags?.forEach(tag => tagSet.add(tag)));
                setTags(Array.from(tagSet));
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        loadData();
    }, []);

    // Sync State FROM URL (Handle Back Button / Reload)
    useEffect(() => {
        const query = new URLSearchParams(location.search).get('search') || '';
        if (query !== searchQuery) {
            setSearchQuery(query);
        }
    }, [location.search]);

    // Sync URL FROM State (Handle Typing)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const currentQuery = new URLSearchParams(location.search).get('search') || '';
            
            if (searchQuery !== currentQuery) {
                if (searchQuery) {
                    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
                } else if (path === '/') {
                    // Only clear URL param if on home page
                    navigate('/');
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, navigate]); // Removed location.pathname

    const getLinkClass = (isActive) =>
        isActive ? 'bg-lime-600 text-black font-semibold rounded-md px-3 py-1' : 'px-3 py-1';

    return (
        <div className="navbar backdrop-blur-sm bg-black/30 shadow-md z-50 sticky top-0 px-4 ">
            <div className="flex-1 hidden sm:flex items-center gap-4">
                <Link to="/" className="btn btn-ghost normal-case text-lg sm:text-3xl">📝 Blog</Link>
                
                {/* Search Bar */}
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="input input-sm input-bordered w-full rounded-full bg-base-200/50 focus:bg-base-200 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Mobile: Hamburger, Logo, and Profile */}
            <div className="sm:hidden relative flex items-center justify-between w-full h-16">
                {/* Left: Hamburger */}
                <button
                    className="btn btn-square btn-ghost order-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Center: Logo */}
                <Link
                    to="/"
                    className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold"
                >
                    📝 Blog
                </Link>

                {/* Right: Profile / Login */}
                {user ? (
                    <div className="dropdown dropdown-end order-3">
                        <label tabIndex={0} className="btn btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-lime-600 ring-offset-base-100 ring-offset-2">
                                <img
                                    src={authorData?.picA || '/default-avatar.png'}
                                    alt="profile"
                                />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[60] p-4 shadow bg-base-300 rounded-box w-52">
                            <li><Link to={`/author/${user.authorID}`}>👤 View Profile</Link></li>
                            <li><Link to={`/author/${user.authorID}/posts`}>📚 All Posts</Link></li>
                            <li><button onClick={() => logout()}>🚪 Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-sm btn-outline order-3">Sign In</Link>
                )}
            </div>

            {/* Desktop Links */}
            <div className="hidden sm:flex items-center gap-4">
                <Link to="/" className={getLinkClass(path === '/')}>Home</Link>
                <Link to="/authors" className={getLinkClass(path === '/authors')}>Authors</Link>

                <div className="dropdown dropdown-end z-[50]">
                    <label tabIndex={0} className="btn btn-ghost">Categories</label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52 max-h-64 overflow-y-auto"
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

                {/* Desktop Profile/Login */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            className="btn btn-circle avatar hover:scale-105 transition-transform duration-200"
                        >
                            <div className="w-10 rounded-full ring ring-lime-600 ring-offset-base-100 ring-offset-2">
                                <img
                                    src={authorData?.picA || '/default-avatar.png'}
                                    alt="profile"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[60] p-4 shadow bg-base-300 rounded-box w-52"
                        >
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
                    <Link to="/login" className="btn btn-sm btn-outline text-black bg-cyan-600">Sign In</Link>
                )}
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-base-300 sm:hidden flex flex-col items-start p-4 z-40 shadow-lg gap-2">
                    {/* Mobile Search */}
                    <div className="w-full mb-2">
                         <input
                            type="text"
                            placeholder="Search blogs..."
                            className="input input-sm input-bordered w-full rounded-full bg-base-200/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-between w-full items-center">
                         <Link to="/" className={getLinkClass(path === '/')} onClick={() => setMenuOpen(false)}>Home</Link>
                    </div>

                    <Link to="/authors" className={getLinkClass(path === '/authors')} onClick={() => setMenuOpen(false)}>Authors</Link>

                    <details className="w-full">
                        <summary className="cursor-pointer text-white px-2 py-1">Categories</summary>
                        <ul className="pl-4">
                            {tags.length > 0 ? (
                                tags.map((tag, index) => {
                                    const isActive = activeTag === tag;
                                    return (
                                        <li key={index}>
                                            <Link
                                                to={`/category/${tag}`}
                                                className={getLinkClass(isActive)}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                #{tag}
                                            </Link>
                                        </li>
                                    );
                                })
                            ) : (
                                <li className="text-gray-400 px-2 text-xs">No tags</li>
                            )}
                        </ul>
                    </details>
                </div>
            )}
        </div>
    );
};

export default Navbar;
