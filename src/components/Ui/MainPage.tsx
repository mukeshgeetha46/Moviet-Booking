import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import HeroSlider from "./HeroSlider";
import MovieCard from "./MovieCard";

interface Movie {
  title: string;
  genre: string;
  likes: string;
  poster: string;
  promoted?: boolean;
    movie_id: number;
  image_url: string; 
}


interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

export default function MainPage(): React.ReactElement {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse<Movie[]>>("/allmovies");
      setMovies(response.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading ...</div>
      </div>
    );
  }
  return (
    <div>
      <HeroSlider />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recommended Movies</h2>
        <span className="text-red-500 text-sm cursor-pointer">See All ›</span>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-4 mt-4 overflow-x-auto pb-4 max-w-7xl mx-auto">
        {movies.map((m, i) => (
          <MovieCard key={i} movie={m} />
        ))}
      </div>
    </div>
  );
}
