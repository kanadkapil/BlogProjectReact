import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub, faLinkedin, faGoogle, faInstagram,
  faFacebook, faYoutube, faSpotify
} from '@fortawesome/free-brands-svg-icons';

const AuthorProfile = () => {
  const { authorID } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetch('/authors.json')
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data.find(a => a.authorID === authorID) || null);
      })
      .catch(console.error);
  }, [authorID]);

  if (!author) {
    return (
      <div className="text-center py-10 text-xl">Author not found.</div>
    );
  }

  if (!author.isActive) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">Author profile is private 🔒</h2>
        <Link to="/" className="btn btn-outline btn-primary mt-4">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-zinc-900 p-6 rounded-xl shadow-lg mt-6 text-white">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* ✅ Lazy load author pic */}
        <img
          src={author.picA}
          alt={author.name}
          loading="lazy"
          decoding="async"
          className="w-48 h-48 rounded-full object-cover"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold py-2">{author.name}</h1>
          <p className="text-sm text-gray-400">
            {author.designation} @ {author.company}
          </p>
          <p className="mt-2">
            {author.work} | {author.profession}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
            {author.github && author.showGithub && (
              <a href={author.github} className="btn" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} className="text-white text-lg" />
              </a>
            )}
            {author.linkedin && author.showLinkedIn && (
              <a href={author.linkedin} className="btn" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="text-indigo-700 text-lg" />
              </a>
            )}
            {author.gmail && author.showGmail && (
              <a href={`mailto:${author.gmail}`} className="btn">
                <FontAwesomeIcon icon={faGoogle} className="text-lime-600 text-lg" />
              </a>
            )}
            {author.insta && author.showInsta && (
              <a href={author.insta} className="btn" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="text-purple-600 text-lg" />
              </a>
            )}
            {author.fb && author.showFb && (
              <a href={author.fb} className="btn" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="text-indigo-400 text-lg" />
              </a>
            )}
            {author.youtube && author.showYoutube && (
              <a href={author.youtube} className="btn" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faYoutube} className="text-red-400 text-lg" />
              </a>
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
            src={author.spotify}
            width="100%"
            height="152"
            loading="lazy"
            style={{ borderRadius: "12px" }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        </div>
      )}

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="btn btn-primary">⬅ Back to Home</Link>
        <Link to={`/author/${author.authorID}/posts`} className="btn btn-outline">
          📚 All Posts
        </Link>
      </div>
    </div>
  );
};

export default AuthorProfile;
