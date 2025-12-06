import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../services/api";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";

export default function GenreMovies() {
  const { slug } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await api.getMoviesByGenre(`${slug}?page=${page}`);
        setMovies(response.data.data?.items || []);
        setTotalPages(response.data.data?.params?.pagination?.total_page || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [slug, page]);

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

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="home-container">
      <div className="home-section">
        <div className="section-header">
          <h2>Thể loại: {slug}</h2>
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              ←
            </button>
            <span className="pagination-info">
              Trang {page} / {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              →
            </button>
          </div>
        </div>

        {movies.length === 0 ? (
          <div className="error-container">
            <p>Không tìm thấy phim nào</p>
          </div>
        ) : (
          <div className="movies-row">
            <div className="movies-slider">
              {movies.map((movie) => (
                <div key={movie._id} className="movie-item">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
