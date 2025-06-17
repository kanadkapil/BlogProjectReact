import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const AuthorProfile = () => {
    const { authorID } = useParams();
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        fetch('/authors.json')
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((a) => a.authorID === authorID);
                setAuthor(found);
            });
    }, [authorID]);

    if (!author) {
        return <div className="text-center py-10 text-xl">Author not found.</div>;
    }

    if (author.isActive === false || author.isActive === "false") {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold">Author profile is private 🔒</h2>
                <Link to="/" className="btn btn-outline btn-primary mt-4">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-xl shadow-lg mt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={author.picA}
                    alt={author.name}
                    className="w-48 h-48 rounded-full border border-primary object-cover"
                />
                <div>
                    <h1 className="text-3xl font-bold">{author.name}</h1>
                    <p className="text-sm text-gray-500">{author.designation} @ {author.company}</p>
                    <p className="mt-2">{author.work} | {author.profession}</p>

                    <div className="mt-4 flex flex-wrap gap-3">
                        {author.github && <a href={author.github} className="btn btn-sm btn-outline" target="_blank">GitHub</a>}
                        {author.linkedin && <a href={author.linkedin} className="btn btn-sm btn-outline" target="_blank">LinkedIn</a>}
                        {author.gmail && <a href={author.gmail} className="btn btn-sm btn-outline">Gmail</a>}
                        {author.insta && <a href={author.insta} className="btn btn-sm btn-outline">Instagram</a>}
                        {author.fb && <a href={author.fb} className="btn btn-sm btn-outline">Facebook</a>}
                        {author.youtube && <a href={author.youtube} className="btn btn-sm btn-outline">YouTube</a>}
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">About</h2>
                <p className="text-base mt-2">{author.about}</p>

                <h2 className="text-xl font-semibold mt-4">Details</h2>
                <p className="text-base mt-2">{author.details}</p>
            </div>

            {author.spotify && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">🎵 Favorite Track</h2>
                    <iframe
                        style={{ borderRadius: "12px" }}
                        src={author.spotify}
                        width="100%"
                        height="152"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            )}

            <div className="mt-8 text-right">
                <Link to="/" className="btn btn-primary">⬅ Back to Home</Link>
            </div>
        </div>
    );
};

export default AuthorProfile;
