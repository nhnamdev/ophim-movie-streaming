import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import CategoryMovies from "./pages/CategoryMovies";
import Genres from "./pages/Genres";
import GenreMovies from "./pages/GenreMovies";
import Countries from "./pages/Countries";
import CountryMovies from "./pages/CountryMovies";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:slug" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:slug" element={<CategoryMovies />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genre/:slug" element={<GenreMovies />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/country/:slug" element={<CountryMovies />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© 2025 Ophim. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
