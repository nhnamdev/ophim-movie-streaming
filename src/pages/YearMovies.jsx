import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../services/api";
import MovieCard from "../components/MovieCard";
import "../styles/Pages.css";

export default function YearMovies() {
  const { year } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await api.getMoviesByYear(`${year}?page=${page}`);
        setMovies(response.data.data?.items || []);
        setTotalPages(response.data.data?.params?.pagination?.total_page || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [year, page]);

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
    <div className="page-container">
      <div className="page-header">
        <h1>Phim năm {year}</h1>
        <p>Danh sách phim phát hành năm {year}</p>
      </div>

      {movies.length === 0 ? (
        <div className="error-container">
          <p>Không tìm thấy phim nào</p>
        </div>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              ←
            </button>
            <span className="pagination-btn active">{page}</span>
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
