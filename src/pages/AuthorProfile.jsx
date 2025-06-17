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
        <div className="max-w-4xl mx-auto bg-zinc-900 p-6 rounded-xl shadow-lg mt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={author.picA}
                    alt={author.name}
                    className="w-48 h-48 rounded-full border border-primary object-cover"
                />
                <div>
                    <h1 className="text-3xl font-bold">{author.name}</h1>
                    <p className="text-sm text-gray-500">
                        {author.designation} @ {author.company}
                    </p>
                    <p className="mt-2">
                        {author.work} | {author.profession}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                        {author.github && author.showGithub && (
                            <a href={author.github} className="btn btn-sm btn-outline" target="_blank" rel="noreferrer">GitHub</a>
                        )}
                        {author.linkedin && author.showLinkedIn && (
                            <a href={author.linkedin} className="btn btn-sm btn-outline" target="_blank" rel="noreferrer">LinkedIn</a>
                        )}
                        {author.gmail && author.showGmail && (
                            <a href={`mailto:${author.gmail}`} className="btn btn-sm btn-outline">Gmail</a>
                        )}
                        {author.insta && author.showInsta && (
                            <a href={author.insta} className="btn btn-sm btn-outline" target="_blank" rel="noreferrer">Instagram</a>
                        )}
                        {author.fb && author.showFb && (
                            <a href={author.fb} className="btn btn-sm btn-outline" target="_blank" rel="noreferrer">Facebook</a>
                        )}
                        {author.youtube && author.showYoutube && (
                            <a href={author.youtube} className="btn btn-sm btn-outline" target="_blank" rel="noreferrer">YouTube</a>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">About</h2>
                <p className="text-base mt-2">{author.about}</p>

                <h2 className="text-xl font-semibold mt-4">Details</h2>
                <p className="text-base mt-2">{author.details}</p>
            </div>

            {author.spotify && author.showSpotify && (
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
            <Link to={`/author/${author.authorID}/posts`} className="btn btn-outline mt-6">
                📚 All Posts
            </Link>

        </div>
    );
};

export default AuthorProfile;
