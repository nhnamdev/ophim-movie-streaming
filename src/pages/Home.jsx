import { useState, useEffect } from "react";
import * as api from "../services/api";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";

export default function Home() {
  const [sections, setSections] = useState({
    featured: [],
    phimLe: [],
    phimBo: [],
    tvShows: [],
    anime: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);

        const [homeRes, phimLeRes, phimBoRes, hoatHinhRes] = await Promise.all([
          api.getHome(),
          api.getMoviesByCategory("phim-le?page=1"),
          api.getMoviesByCategory("phim-bo?page=1"),
          api.getMoviesByCategory("hoat-hinh?page=1"),
        ]);

        setSections({
          featured: homeRes.data.data?.items?.slice(0, 15) || [],
          phimLe: phimLeRes.data.data?.items?.slice(0, 15) || [],
          phimBo: phimBoRes.data.data?.items?.slice(0, 15) || [],
          tvShows: homeRes.data.data?.items?.slice(15, 30) || [],
          anime: hoatHinhRes.data.data?.items?.slice(0, 15) || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Đã xảy ra lỗi</h2>
        <p>{error}</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Phim Nổi Bật */}
      {sections.featured.length > 0 && (
        <section className="home-section">
          <h2 className="section-title">🔥 Phim Nổi Bật</h2>
          <div className="movies-row">
            <div className="movies-slider">
              {sections.featured.map((movie) => (
                <div key={movie._id} className="movie-item">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Phim Lẻ */}
      {sections.phimLe.length > 0 && (
        <section className="home-section">
          <h2 className="section-title">🎬 Phim Lẻ Mới</h2>
          <div className="movies-row">
            <div className="movies-slider">
              {sections.phimLe.map((movie) => (
                <div key={movie._id} className="movie-item">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Phim Bộ */}
      {sections.phimBo.length > 0 && (
        <section className="home-section">
          <h2 className="section-title">📺 Phim Bộ Hot</h2>
          <div className="movies-row">
            <div className="movies-slider">
              {sections.phimBo.map((movie) => (
                <div key={movie._id} className="movie-item">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TV Shows */}
      {sections.tvShows.length > 0 && (
        <section className="home-section">
          <h2 className="section-title">⭐ Xu Hướng</h2>
          <div className="movies-row">
            <div className="movies-slider">
              {sections.tvShows.map((movie) => (
                <div key={movie._id} className="movie-item">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hoạt Hình */}
      {sections.anime.length > 0 && (
        <section className="home-section">
          <h2 className="section-title">🎨 Hoạt Hình</h2>
          <div className="movies-row">
            <div className="movies-slider">
              {sections.anime.map((movie) => (
                <div key={movie._id} className="movie-item">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
