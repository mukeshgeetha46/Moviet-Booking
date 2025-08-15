import React, { useState, useEffect } from 'react';
import { ShareAltOutlined, PlayCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

interface Movie {
  movie_id: number;
  title: string;
  interest_count: string;
  tagline: string;
  languages: string;
  release_date: string;
  show_time: string;
  genres: string;
  certification: string;
  description: string;
  director: string;
  lead_actor: string;
  cast_members: string[];
  duration_minutes: number;
  rating: string | null;
  production_company: string | null;
  image_url: string;
}

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

const MovieDetails = () => {
  const params = useParams<{ moviename: string; movieid: string }>();
  const [isInterested, setIsInterested] = useState(false);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleInterested = () => {
    setIsInterested(!isInterested);
    // You might want to make an API call here to update interest count
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const fetchMoviesdetails = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse<Movie>>(`/movies/${params.movieid}`);
      setMovieDetails(response.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesdetails();
  }, [params]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!movieDetails) return <div className="min-h-screen flex items-center justify-center">No movie data found</div>;

  return (
    <div className="min-h-screen bg-white text-white">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage: `url(${movieDetails.image_url})`,
            filter: 'brightness(0.5)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        {/* Header */}
        <div className="relative z-10 flex justify-end p-6">
          <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-colors">
            <ShareAltOutlined style={{ fontSize: '18px' }} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 px-6 pb-16 max-w-7xl mx-auto">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-72 h-96 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={movieDetails.image_url}
                alt={movieDetails.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4">
                <button className="bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors">
                  <PlayCircleOutlined style={{ fontSize: '20px', color: 'white' }} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 text-sm font-medium">
                <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded">Trailers (5)</span>
              </div>
              <div className="absolute bottom-4 right-4 text-xs">
                In cinemas
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex-grow space-y-6">
            <h1 className="text-5xl font-bold">{movieDetails.title}</h1>
         

            {/* Interest Section */}
            <div className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 w-fit">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-semibold">
                  {movieDetails.interest_count}
                </span>
              </div>
              <button
                onClick={handleInterested}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isInterested 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                {isInterested ? "Interested" : "I'm interested"}
              </button>
            </div>

            {/* Movie Format & Languages */}
            <div className="flex flex-wrap gap-3">
              <span className="bg-gray-700 px-3 py-1 rounded-md text-sm font-medium">2D</span>
              <span className="bg-gray-700 px-3 py-1 rounded-md text-sm">{movieDetails.languages}</span>
            </div>

            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <span>{formatDuration(movieDetails.duration_minutes)}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>{movieDetails.genres}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span className="bg-gray-700 px-2 py-1 rounded text-xs">{movieDetails.certification}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>{formatDate(movieDetails.release_date)}</span>
            </div>

            {/* Book Tickets Button */}
            <button 
              onClick={() => navigate(`/movies/buytickets`)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book tickets
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className='max-w-7xl mx-auto'>
        <div className="bg-white text-black py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About the movie</h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
              {movieDetails.description}
            </p>
            {movieDetails.director && (
              <p className="mt-4 text-gray-700">
                <span className="font-semibold">Director:</span> {movieDetails.director}
              </p>
            )}
            {movieDetails.lead_actor && (
              <p className="text-gray-700">
                <span className="font-semibold">Starring:</span> {movieDetails.lead_actor}
              </p>
            )}
          </div>
        </div>

        {/* Cast Section */}
        {movieDetails.cast_members && movieDetails.cast_members.length > 0 && (
          <div className="bg-gray-50 text-black py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Cast</h2>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                    <LeftOutlined style={{ fontSize: '20px' }} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                    <RightOutlined style={{ fontSize: '20px' }} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {movieDetails.cast_members.map((member, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className="relative w-24 h-24 mx-auto mb-3 overflow-hidden rounded-full ring-4 ring-gray-200 group-hover:ring-red-500 transition-all duration-300">
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-4xl">{member.charAt(0)}</span>
                      </div>
                    </div>
                    <p className="font-medium text-sm text-gray-800 group-hover:text-red-600 transition-colors">
                      {member}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;