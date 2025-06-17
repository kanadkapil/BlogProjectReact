import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-md px-4">
            <div className="flex-1">
                <Link to="/" className="text-xl font-bold text-primary">
                    📝 Mini Blog Viewer
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
