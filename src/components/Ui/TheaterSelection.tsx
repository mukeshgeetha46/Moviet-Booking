import { useState } from "react";
import { Button, Badge } from "antd";
import { EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

interface Theater {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  showtimes: string[];
  facilities: string[];
}

interface TheaterSelectionProps {
  movieTitle: string;
  onShowtimeSelect: (theater: Theater, showtime: string) => void;
}

const theaters: Theater[] = [
  {
    id: "1",
    name: "PVR Cinemas - Phoenix MarketCity",
    location: "Kurla West, Mumbai",
    distance: "2.5 km",
    rating: 4.3,
    showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM", "11:00 PM"],
    facilities: ["Dolby Atmos", "IMAX", "Recliner Seats"],
  },
  {
    id: "2",
    name: "INOX Leisure Ltd - R City Mall",
    location: "Ghatkopar West, Mumbai",
    distance: "3.2 km",
    rating: 4.1,
    showtimes: ["11:15 AM", "2:45 PM", "6:15 PM", "9:45 PM"],
    facilities: ["4DX", "Premium Seating", "Food Court"],
  },
  {
    id: "3",
    name: "Cinepolis Fun Cinemas",
    location: "Andheri East, Mumbai",
    distance: "4.8 km",
    rating: 4.0,
    showtimes: ["12:30 PM", "4:00 PM", "7:30 PM", "10:30 PM"],
    facilities: ["Premium Seating", "Snacks", "Parking"],
  },
];

const TheaterSelection = () => {
  const [selectedDate, setSelectedDate] = useState("Today");
  const movieTitle = 'Avengers: Infinity';
  const dates = ["Today", "Tomorrow", "Sun 15", "Mon 16", "Tue 17"];
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white py-8 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{movieTitle}</h1>
          <p className="text-gray-600">Select your preferred cinema & showtime</p>
        </div>

        {/* Date Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
          <div className="flex space-x-2 overflow-x-auto">
            {dates.map((date) => (
              <Button
                key={date}
                type={selectedDate === date ? "primary" : "default"}
                onClick={() => setSelectedDate(date)}
                className="whitespace-nowrap"
              >
                {date}
              </Button>
            ))}
          </div>
        </div>

        {/* Theater List */}
        <div className="space-y-6">
          {theaters.map((theater) => (
            <div key={theater.id} className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
              {/* Theater Info */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{theater.name}</h3>
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <div className="flex items-center">
                      <EnvironmentOutlined className="mr-1" />
                      <span className="text-sm">{theater.location}</span>
                    </div>
                    <span className="text-sm">{theater.distance}</span>
                    <div className="flex items-center">
                      <StarFilled className="mr-1 text-yellow-500" />
                      <span className="text-sm">{theater.rating}</span>
                    </div>
                  </div>
                  
                  {/* Facilities */}
                  <div className="flex flex-wrap gap-2">
                    {theater.facilities.map((facility) => (
                      <Badge key={facility} className="bg-gray-200 text-gray-800 text-xs p-1 rounded">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Showtimes */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Showtimes</h4>
                <div className="flex flex-wrap gap-3">
                  {theater.showtimes.map((time) => (
                    <Button
                      key={time}
                      type="default"
                      className="hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors"
                      onClick={()=>navigate('/movies/seat-layout')}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheaterSelection;