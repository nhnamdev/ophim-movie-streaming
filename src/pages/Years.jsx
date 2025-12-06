import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import "../styles/Pages.css";

export default function Years() {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        const response = await api.getYears();
        setYears(response.data.data?.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
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
        <h1>Năm Phát Hành</h1>
        <p>Tìm kiếm phim theo năm phát hành</p>
      </div>
      <div className="filter-grid">
        {years.map((year) => (
          <Link
            key={year._id}
            to={`/year/${year.name}`}
            className="filter-card"
          >
            <h3>{year.name}</h3>
            <p>Khám phá ngay</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
