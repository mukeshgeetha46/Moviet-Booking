import React, { useState } from 'react';
import { ShareAltOutlined, PlayCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const MovieDetails = () => {
  const [isInterested, setIsInterested] = useState(false);
  const [interestedCount, setInterestedCount] = useState(1100000);
  const navigate = useNavigate();
  const handleInterested = () => {
    if (isInterested) {
      setInterestedCount(prev => prev - 1);
    } else {
      setInterestedCount(prev => prev + 1);
    }
    setIsInterested(!isInterested);
  };

  const formatInterestCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  const castMembers = [
    { name: 'Rajinikanth', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { name: 'Nagarjuna', image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { name: 'Aamir Khan', image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { name: 'Sathyaraj', image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { name: 'Upendra', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { name: 'Soubin Shahir', image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-white text-white">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
            filter: 'brightness(0.3)'
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
                src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@like_202006280402.png,lx-24,ly-617,w-29,l-end:l-text,ie-MS4xTSBMaWtlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end:l-text,ie-UFJPTU9URUQ%3D,co-FFFFFF,bg-DC354B,ff-Roboto,fs-20,lx-N16,ly-12,lfo-top_right,pa-12_14_12_14,r-6,l-end/et00395817-qjtckyrarb-portrait.jpg"
                alt="Coolie"
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
            <h1 className="text-5xl font-bold">Coolie</h1>

            {/* Interest Section */}
            <div className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-semibold">
                  {formatInterestCount(interestedCount)} are interested
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
              <span className="bg-gray-700 px-3 py-1 rounded-md text-sm">Tamil, Kannada, Telugu</span>
            </div>

            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <span>2h 49m</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>Action, Thriller</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span className="bg-gray-700 px-2 py-1 rounded text-xs">A</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>14 Aug, 2025</span>
            </div>

            {/* Book Tickets Button */}
            <button onClick={()=>navigate('/movies/buytickets')} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
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
            Coolie is a multilingual movie starring Rajinikanth in the lead role. It is directed by Lokesh Kanagaraj. 
            This high-octane action thriller promises to deliver an unforgettable cinematic experience with stellar 
            performances and breathtaking action sequences. The film brings together an ensemble cast in a gripping 
            narrative that spans across different languages and cultures.
          </p>
        </div>
      </div>

      {/* Cast Section */}
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
            {castMembers.map((member, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="relative w-24 h-24 mx-auto mb-3 overflow-hidden rounded-full ring-4 ring-gray-200 group-hover:ring-red-500 transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="font-medium text-sm text-gray-800 group-hover:text-red-600 transition-colors">
                  {member.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default MovieDetails;