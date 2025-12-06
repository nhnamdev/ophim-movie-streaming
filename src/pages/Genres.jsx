import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import "../styles/Pages.css";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await api.getGenres();
        setGenres(response.data.data?.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <h2>Đã xảy ra lỗi</h2>
        <p>{error}</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Thử lại
        </button>
      </div>
    );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Thể Loại Phim</h1>
        <p>Khám phá phim theo thể loại yêu thích</p>
      </div>
      <div className="filter-grid">
        {genres.map((genre) => (
          <Link
            key={genre._id}
            to={`/genre/${genre.slug}`}
            className="filter-card"
          >
            <h3>{genre.name}</h3>
            <p>Khám phá ngay</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
