import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import "../styles/Pages.css";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await api.getCountries();
        setCountries(response.data.data?.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
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
        <h1>Quốc Gia</h1>
        <p>Khám phá phim từ các quốc gia trên thế giới</p>
      </div>
      <div className="filter-grid">
        {countries.map((country) => (
          <Link
            key={country._id}
            to={`/country/${country.slug}`}
            className="filter-card"
          >
            <h3>{country.name}</h3>
            <p>Khám phá ngay</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
