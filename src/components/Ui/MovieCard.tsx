import React from "react";
import { useNavigate } from "react-router-dom";
interface Movie {
  poster: string;
  title: string;
  genre: string;
  likes: string | number;
  promoted?: boolean;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[200px] flex-shrink-0" onClick={()=> navigate(`/movies/${movie.title}`)}>
      <div className="relative">
        <img
          src={movie.poster}
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
