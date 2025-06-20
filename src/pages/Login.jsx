import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
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
                <input type="email" placeholder="Email" className="input input-bordered w-full" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="input input-bordered w-full" value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="btn btn-primary w-full">Login</button>
            </form>
        </div>
    );
};

export default Login;
