import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>🎬 Ophim</h1>
        </Link>
        <nav className="nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/category/phim-le">Phim Lẻ</Link>
          <Link to="/category/phim-bo">Phim Bộ</Link>
          <Link to="/genres">Thể Loại</Link>
          <Link to="/countries">Quốc Gia</Link>
        </nav>
        <SearchBar />
      </div>
    </header>
  );
}
