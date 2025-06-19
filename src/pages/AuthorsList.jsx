import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetch('/authors.json')
            .then((res) => res.json())
            .then((data) => {
                const visibleAuthors = data.filter((author) => author.isActive === true || author.isActive === "true");
                setAuthors(visibleAuthors);
            });
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">👨‍💼 Our Authors</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {authors.map((author) => (
                    <Link to={`/author/${author.authorID}`} key={author.authorID}>
                        <div className="card bg-zinc-900 hover:scale-102 shadow hover:shadow-lg transition-all duration-300 hover:contrast-105 border-black">
                            <figure className="px-4 pt-4">
                                <img
                                    src={author.picA}
                                    alt={author.name}
                                    className="rounded-full w-40 h-40 object-cover "
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h1 className="card-title text-3xl">{author.name}</h1>
                                <p className="text-sm text-gray-500">{author.designation}</p>
                                <p className="text-sm text-gray-600">{author.work}</p>
                                <div className="card-actions mt-4">
                                    <button className="btn btn-sm btn-outline hover:bg-lime-400 hover:text-black">View Profile</button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AuthorsList;
