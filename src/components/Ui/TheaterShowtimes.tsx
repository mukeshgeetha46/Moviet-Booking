import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Theater {
  theater_id: string | number;
  // Add other theater properties if needed
}

interface TheaterShowtimesProps {
  theater: Theater;
}

const TheaterShowtimes: React.FC<TheaterShowtimesProps> = ({ theater }) => {
  const navigate = useNavigate();
  const commonShowtimes: string[] = ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM", "11:00 PM"];

  // Get current date and end of month
  const today: Date = new Date();
  const endOfMonth: Date = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  // Generate array of dates from today to end of month
  const dates: Date[] = [];
  const currentDate: Date = new Date(today);
  
  while (currentDate <= endOfMonth) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex space-x-4" style={{ minWidth: 'max-content' }}>
        {dates.map((date) => (
          <div key={date.toString()} className="flex-shrink-0 w-48">
            <div className="text-center font-medium mb-2">
              {formatDate(date)}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {commonShowtimes.map((time) => (
                <Button
                  key={time}
                  type="default"
                  size="small"
                  className="hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors"
                  onClick={() => navigate(`/movies/seat-layout/${theater.theater_id}`)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterShowtimes;