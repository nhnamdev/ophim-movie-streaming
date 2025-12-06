import axios from "axios";

export const BASE_URL = "https://ophim1.com/v1/api";
export const IMAGE_URL = "https://img.ophim.live/uploads/movies/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

// Home
export const getHome = () => apiClient.get("/home");

// Danh sách phim
export const getMoviesByCategory = (slug) =>
  apiClient.get(`/danh-sach/${slug}`);

// Tìm kiếm
export const searchMovies = (keyword) =>
  apiClient.get("/tim-kiem", { params: { keyword } });

// Danh sách thể loại
export const getGenres = () => apiClient.get("/the-loai");

// Phim theo thể loại
export const getMoviesByGenre = (slug) => apiClient.get(`/the-loai/${slug}`);

// Danh sách quốc gia
export const getCountries = () => apiClient.get("/quoc-gia");

// Phim theo quốc gia
export const getMoviesByCountry = (slug) => apiClient.get(`/quoc-gia/${slug}`);

// Năm phát hành
export const getYears = () => apiClient.get("/nam-phat-hanh");

// Phim theo năm
export const getMoviesByYear = (year) =>
  apiClient.get(`/nam-phat-hanh/${year}`);

// Thông tin chi tiết phim
export const getMovieDetail = (slug) => apiClient.get(`/phim/${slug}`);

// Hình ảnh phim
export const getMovieImages = (slug) => apiClient.get(`/phim/${slug}/images`);

// Diễn viên
export const getMoviePeople = (slug) => apiClient.get(`/phim/${slug}/peoples`);

// Từ khóa
export const getMovieKeywords = (slug) =>
  apiClient.get(`/phim/${slug}/keywords`);

export default apiClient;
