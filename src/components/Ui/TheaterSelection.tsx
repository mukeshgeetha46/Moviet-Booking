import { useEffect, useState } from "react";
import { Button, Badge } from "antd";
import { ArrowLeftOutlined, EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Theater {
  theater_id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  facilities: string[];
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}
interface Movie {
  movie_id: number;
  title: string;
}

interface DateOption {
  label: string;
  fullDate: Date;
}

// Common showtimes for all theaters
const commonShowtimes = ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM", "11:00 PM"];

const TheaterSelection = () => {
const { movieId, setMovieDate } = useAuth();

  const [selectedDate, setSelectedDate] = useState("Today");
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [movieName, setMovieName] = useState<string>("");
  const [selectedDatefull, setSelectedfullDate] = useState<DateOption | undefined>();


    console.log(selectedDatefull)

  const getDatesUntilMonthEnd = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const datesArray: DateOption[] = [];

    const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });

    const lastDayOfMonth = new Date(
      today.getFullYear(),
      currentMonth + 1,
      0
    ).getDate();
    const daysRemaining = lastDayOfMonth - today.getDate();

    for (let i = 0; i <= daysRemaining; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
     
      let label = "";
      if (i === 0) label = "Today";
      else if (i === 1) label = "Tomorrow";
      else label = `${dayFormatter.format(date)} ${date.getDate()}`;

      datesArray.push({ label, fullDate: date });
    }

    return datesArray;
  };

 

  const dates = getDatesUntilMonthEnd();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoviesdetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<ApiResponse<Theater[]>>(`/theaters`);
        setTheaters(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesdetails();
  }, []);

  useEffect(() => {
    const fetchMoviesName = async () => {
      if (!movieId) return;
      
      try {
        const response = await axiosInstance.get<ApiResponse<Movie>>(`/movies/name/${movieId}`);
        if (response.data.data && response.data.data.title) {
          setMovieName(response.data.data.title);
        }
      } catch (err) {
        console.error(err);
        setMovieName("Movie Title Not Available");
      }
    };
    fetchMoviesName();
  }, [movieId]); 

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!theaters) return <div className="min-h-screen flex items-center justify-center">No movie data found</div>;
  
  return (
    <div className="min-h-screen bg-white py-8 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        
        <div className="mb-8">
           <div className="flex items-center gap-5">
<div onClick={() => navigate(-1)}>
    <ArrowLeftOutlined style={{ fontSize: 25 }} />
  </div>

       <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{movieName}</h1>
          <p className="text-gray-600">Select your preferred cinema & showtime</p>
       </div>
           </div>
          
          

          
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
          <div className="flex space-x-2 overflow-x-auto">
            {dates.map((date) => (
              <Button
                key={date.label}
                type={selectedDate === date.label ? "primary" : "default"}
                onClick={() => {
                  setSelectedDate(date.label);
                  setSelectedfullDate(date);
                  setMovieDate(date.fullDate);
                }}
                className="whitespace-nowrap"
              >
                {date.label}
              </Button>
            ))}
          </div>
        </div>


        <div className="space-y-6">
          {theaters.map((theater) => (
            <div key={theater.theater_id} className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
      
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{theater.name}</h3>
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <div className="flex items-center">
                      <EnvironmentOutlined className="mr-1" />
                      <span className="text-sm">{theater.address}, {theater.city}, {theater.state} - {theater.pincode}</span>
                    </div>
                    <div className="flex items-center">
                      <StarFilled className="mr-1 text-yellow-500" />
                      <span className="text-sm">4.2</span>
                    </div>
                  </div>
                  
           
                  <div className="flex flex-wrap gap-2">
                    {theater.facilities?.map((facility: string) => (
                      <Badge key={facility} className="bg-gray-200 text-gray-800 text-xs p-1 rounded">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

         
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Showtimes</h4>
                <div className="flex flex-wrap gap-3">
                  {commonShowtimes.map((time) => (
                    <Button
                      key={time}
                      type="default"
                      className="hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors"
                      onClick={() => navigate(`/movies/seat-layout/${theater.theater_id}`)}
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