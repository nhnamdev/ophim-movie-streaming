import { useState, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieGrid.css";

export default function MovieGrid({ title, apiCall, loadMore = false }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = useCallback(
    async (pageNum) => {
      try {
        setLoading(true);
        const response = await apiCall(pageNum);
        if (pageNum === 1) {
          setMovies(response.data.data?.items || []);
        } else {
          setMovies((prev) => [...prev, ...(response.data.data?.items || [])]);
        }
        setHasMore(
          response.data.data?.params?.pagination?.total_page > pageNum
        );
        setPage(pageNum);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  useEffect(() => {
    loadMovies(1);
  }, [loadMovies]);

  const handleLoadMore = () => {
    loadMovies(page + 1);
  };

  if (loading && movies.length === 0)
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
      </div>
    );

  return (
    <section className="movie-section">
      {title && <h2>{title}</h2>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      {loadMore && hasMore && (
        <button
          className="load-more"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Đang tải..." : "Xem thêm"}
        </button>
      )}
    </section>
  );
}
