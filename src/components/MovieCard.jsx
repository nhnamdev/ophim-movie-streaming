import { Link } from "react-router-dom";
import { IMAGE_URL } from "../services/api";
import "../styles/MovieCard.css";

export default function MovieCard({ movie, isHorizontal = false }) {
  const imageUrl = movie.thumb_url?.startsWith("http")
    ? movie.thumb_url
    : `${IMAGE_URL}${movie.thumb_url}`;

  return (
    <Link
      to={`/movie/${movie.slug}`}
      className={`movie-card ${isHorizontal ? "horizontal" : "vertical"}`}
    >
      <div className="movie-poster">
        <img src={imageUrl} alt={movie.name} loading="lazy" />
        {movie.episode_current && (
          <span className="episode-badge">{movie.episode_current}</span>
        )}
        {movie.year && <span className="year-badge">{movie.year}</span>}
      </div>
      <div className="movie-info">
        <h3>{movie.name}</h3>
        {movie.origin_name && (
          <p className="origin-name">{movie.origin_name}</p>
        )}
        {movie.quality && (
          <p className="quality">
            {movie.quality} {movie.lang ? `- ${movie.lang}` : ""}
          </p>
        )}
      </div>
    </Link>
  );
}
