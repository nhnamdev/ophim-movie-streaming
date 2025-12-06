import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../services/api";
import { IMAGE_URL } from "../services/api";
import "../styles/MovieDetail.css";

export default function MovieDetail() {
  const { slug } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await api.getMovieDetail(slug);
        const data = response.data.data;
        setMovieData(data);

        const posterUrl = data.item.poster_url || data.item.thumb_url;
        if (posterUrl) {
          setSelectedImage(
            posterUrl.startsWith("http")
              ? posterUrl
              : `${IMAGE_URL}${posterUrl}`
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [slug]);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;
  if (!movieData || !movieData.item)
    return <div className="not-found">Không tìm thấy phim</div>;

  const movie = movieData.item;

  return (
    <div className="movie-detail-container">
      <div className="movie-info-section">
        <div className="poster-container">
          <img src={selectedImage} alt={movie.name} />
        </div>
        <div className="info-content">
          <h1>{movie.name}</h1>
          {movie.origin_name && (
            <span className="original-name">{movie.origin_name}</span>
          )}

          <div className="meta-tags">
            {movie.quality && (
              <span className="tag quality">{movie.quality}</span>
            )}
            {movie.lang && <span className="tag">{movie.lang}</span>}
            {movie.year && <span className="tag">{movie.year}</span>}
            {movie.time && <span className="tag">{movie.time}</span>}
          </div>

          <div className="info-grid">
            {movie.episode_current && (
              <div className="info-item">
                <span className="label">Tình trạng</span>
                <span className="value">{movie.episode_current}</span>
              </div>
            )}
            {movie.type && (
              <div className="info-item">
                <span className="label">Thể loại</span>
                <span className="value">{movie.type}</span>
              </div>
            )}
            {movie.category && movie.category.length > 0 && (
              <div className="info-item">
                <span className="label">Danh mục</span>
                <span className="value">
                  {movie.category.map((c) => c.name).join(", ")}
                </span>
              </div>
            )}
            {movie.country && movie.country.length > 0 && (
              <div className="info-item">
                <span className="label">Quốc gia</span>
                <span className="value">
                  {movie.country.map((c) => c.name).join(", ")}
                </span>
              </div>
            )}
            {movie.actor && movie.actor.length > 0 && (
              <div className="info-item">
                <span className="label">Diễn viên</span>
                <span className="value">{movie.actor.join(", ")}</span>
              </div>
            )}
            {movie.director && movie.director.length > 0 && (
              <div className="info-item">
                <span className="label">Đạo diễn</span>
                <span className="value">{movie.director.join(", ")}</span>
              </div>
            )}
          </div>

          {movie.content && (
            <div className="description">
              <div dangerouslySetInnerHTML={{ __html: movie.content }} />
            </div>
          )}
        </div>
      </div>

      {movie.episodes && movie.episodes.length > 0 && (
        <div className="episodes-section">
          {movie.episodes.map((server, index) => (
            <div key={index} className="server-group">
              <h3>{server.server_name}</h3>
              <div className="episodes-grid">
                {server.server_data.map((ep) => (
                  <a
                    key={ep.slug}
                    href={ep.link_embed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="episode-btn"
                  >
                    {ep.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
