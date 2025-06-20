import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authorData, setAuthorData] = useState(null);

    // 🔄 Restore session on page reload
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setAuthorData({
                authorID: parsedUser.authorID,
                name: parsedUser.name,
                picA: parsedUser.picA,
                profession: parsedUser.profession,
                designation: parsedUser.designation,
                // add other author fields you need
            });
        }
    }, []);

    // 🔐 Login function with case-insensitive email and remember me
    const login = async (email, password, remember = false) => {
        try {
            const usersRes = await fetch('/users.json');
            const users = await usersRes.json();
            const normalizedEmail = email.toLowerCase();

            const match = users.find(
                user =>
                    user.email.toLowerCase() === normalizedEmail &&
                    user.password === password &&
                    user.isActive
            );

            if (!match) {
                return { success: false, message: 'Invalid credentials or inactive user' };
            }

            const authorsRes = await fetch('/authors.json');
            const authors = await authorsRes.json();
            const author = authors.find(a => a.authorID === match.authorID && a.isActive);

            if (!author) {
                return { success: false, message: 'Author profile not found or inactive' };
            }

            const fullUser = { ...match, ...author };
            setUser(fullUser);
            setAuthorData({
                authorID: author.authorID,
                name: author.name,
                picA: author.picA,
                profession: author.profession,
                designation: author.designation,
                // add other needed fields here
            });

            if (remember) {
                localStorage.setItem('user', JSON.stringify(fullUser));
            }

            return { success: true };
        } catch (err) {
            console.error('Login error:', err);
            return { success: false, message: 'Login failed. Try again.' };
        }
    };

    // 🚪 Logout function
    const logout = () => {
        setUser(null);
        setAuthorData(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, authorData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
