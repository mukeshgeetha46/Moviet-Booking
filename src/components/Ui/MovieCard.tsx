import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
interface Movie {
  title: string;
  movie_id: number;
  genre: string;
  likes: string | number;
  promoted?: boolean;
    image_url: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
    const { setMovieId } = useAuth();
  
      const handleMovieClick = () => {
        setMovieId(movie.movie_id);
        navigate(`/movies/${movie.title}/${movie.movie_id}`);
      }
const baseUrl = process.env.REACT_APP_API_URL?.replace(/\/api$/, "") || "";
const imageUrl = `${baseUrl}/assets/movie/${movie.image_url}`;

  return (
    <div className="w-[200px] flex-shrink-0" onClick={handleMovieClick}>
      <div className="relative">
        <img
          src={imageUrl}
          alt={movie.title}
          className="rounded-lg w-full"
        />
        {movie.promoted && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            PROMOTED
          </span>
        )}
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">{movie.title}</h3>
        <p className="text-xs text-gray-500">{movie.genre}</p>
        <p className="text-xs text-gray-700">{movie.likes}</p>
      </div>
    </div>
  );
};

export default MovieCard;
