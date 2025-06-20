import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('guest@x.com'); // Sample email
    const [password, setPassword] = useState('x123');  // Sample password
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password, remember);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 bg-zinc-900 p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">🔐 Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="input input-bordered w-full pr-10"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>

                <label className="flex items-center text-sm gap-2">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={e => setRemember(e.target.checked)}
                        className="checkbox checkbox-sm"
                    />
                    Remember Me
                </label>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button type="submit" className="btn bg-lime-600 text-black hover:bg-lime-700 w-full">Login</button>

                {/* Optional: Show sample credentials note */}
                <p className="text-xs text-center mt-2">
                    Use <strong>guest@x.com</strong> / <strong>x123</strong> to login
                </p>
            </form>
        </div>
    );
};

export default Login;
