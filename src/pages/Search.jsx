import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../services/api";
import MovieCard from "../components/MovieCard";
import "../styles/Pages.css";

export default function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!keyword) return;

      try {
        setLoading(true);
        const response = await api.searchMovies(keyword);
        setMovies(response.data.data?.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [keyword]);

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
        <h1>Kết quả tìm kiếm</h1>
        <p>Từ khóa: "{keyword}"</p>
      </div>

      {movies.length === 0 ? (
        <div className="error-container">
          <p>Không tìm thấy phim nào phù hợp với từ khóa "{keyword}"</p>
        </div>
      ) : (
        <>
          <p
            className="results-count"
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "var(--text-secondary)",
            }}
          >
            Tìm thấy {movies.length} kết quả
          </p>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
