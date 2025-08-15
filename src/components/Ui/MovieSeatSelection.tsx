import { useEffect, useState } from "react";
import { Button, Badge, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import TrapezoidCard from "./TrapezoidCard";
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";

interface Seat {
  seat_id: number;
  theater_id: number;
  row_letter: string;
  seat_number: number;
  seat_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

const SeatSelection = () => {
  const { user } = useAuth();
  
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMobileSeatModal, setShowMobileSeatModal] = useState(false);
  
  const navigate = useNavigate();
  const params = useParams<{ theater_id: string }>();
  const movieTitle = 'Avengers: Infinity';
  const theaterName = 'PVR Cinemas - Phoenix MarketCity';
  const showtime = '10:00 AM';


    const handlepayment = () => {
      if(!user){
         toast('Please login to continue', {
      icon: 'ℹ️', // Info emoji
      style: {
        background: '#3b82f6', // Blue background
        color: '#fff',
      },
    });
      }else{
        navigate('/movies/Booking/confirmation')
      }
    }

  useEffect(() => {
    const fetchSeats = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<ApiResponse<Seat[]>>(`/theaters/${params.theater_id}`);
        setSeats(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeats();
  }, [params.theater_id]);

  const handleSeatClick = (seat: Seat) => {
    if (!seat.is_active) return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.seat_id === seat.seat_id);
      if (isSelected) {
        return prev.filter(s => s.seat_id !== seat.seat_id);
      } else {
        if (prev.length >= 10) return prev; // Max 10 seats
        return [...prev, seat];
      }
    });
  };

  const getSeatClassName = (seat: Seat) => {
    const isSelected = selectedSeats.some(s => s.seat_id === seat.seat_id);
    
    if (!seat.is_active) {
      return "bg-gray-400 cursor-not-allowed";
    }
    if (isSelected) {
      return "bg-blue-500 text-white cursor-pointer";
    }
    if (seat.seat_type === "Premium") {
      return "bg-yellow-500 hover:bg-yellow-600 cursor-pointer";
    }
    return "bg-gray-200 hover:bg-gray-300 cursor-pointer";
  };

  const getSeatPrice = (seat: Seat) => {
    return seat.seat_type === "Premium" ? 350 : 200;
  };

  const total = selectedSeats.reduce((sum, seat) => sum + getSeatPrice(seat), 0);
  const regularCount = selectedSeats.filter(s => s.seat_type === "Standard").length;
  const premiumCount = selectedSeats.filter(s => s.seat_type === "Premium").length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading seats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-4 px-2 sm:py-8 sm:max-w-7xl sm:mx-auto">
      <div className="container mx-auto sm:px-4">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{movieTitle}</h1>
          <p className="text-sm sm:text-base text-gray-600">{theaterName} • {showtime}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Seat Map - Visible on desktop */}
          <div className="lg:col-span-3 hidden lg:block">
            {/* Screen */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="bg-gradient-to-r from-transparent via-blue-500 to-transparent h-1 rounded-full mx-auto mb-2"></div>
              <p className="text-gray-500 text-sm">SCREEN THIS WAY</p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-6 mb-4 sm:mb-6">
              {[
                { color: "bg-gray-200", label: "Available" },
                { color: "bg-yellow-500", label: "Premium" },
                { color: "bg-blue-500", label: "Selected" },
                { color: "bg-gray-400", label: "Occupied" }
              ].map((item) => (
                <div key={item.label} className="flex items-center space-x-1 sm:space-x-2">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${item.color}`}></div>
                  <span className="text-xs sm:text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Seats Grid */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 overflow-x-auto flex justify-center items-center">
              <div className="min-w-max m-auto">
                {Array.from(new Set(seats.map(s => s.row_letter))).map(row => (
                  <div key={row} className="flex items-center mb-2 sm:mb-3">
                    <div className="w-6 text-center text-gray-500 font-semibold mr-2 sm:mr-4 text-xs sm:text-sm">
                      {row}
                    </div>
                    <div className="flex flex-nowrap space-x-1 sm:space-x-2">
                      {seats
                        .filter(seat => seat.row_letter === row)
                        .map(seat => (
                          <button
                            key={seat.seat_id}
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-sm transition-all duration-200 text-[10px] sm:text-xs font-medium ${getSeatClassName(seat)}`}
                            onClick={() => handleSeatClick(seat)}
                            disabled={!seat.is_active}
                          >
                            {seat.seat_number}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <TrapezoidCard />
          </div>

          {/* Mobile Seat Selection Button - Visible only on mobile */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setShowMobileSeatModal(true)}
              type="primary"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {selectedSeats.length > 0 
                ? `${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''} Selected` 
                : 'Select Seats'}
            </Button>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-md lg:sticky lg:top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
              
              {selectedSeats.length > 0 ? (
                <>
                  <div className="space-y-3 mb-4">
                    {regularCount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Regular ({regularCount})</span>
                        <span className="text-gray-900">₹{regularCount * 200}</span>
                      </div>
                    )}
                    {premiumCount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Premium ({premiumCount})</span>
                        <span className="text-gray-900">₹{premiumCount * 350}</span>
                      </div>
                    )}
                  </div>

                  <Divider className="my-4" />
                  
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total</span>
                    <span className="text-blue-600">₹{total}</span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Selected Seats</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeats.map(seat => (
                        <Badge 
                          key={seat.seat_id} 
                          count={`${seat.row_letter}${seat.seat_number}`} 
                          className="text-xs"
                          style={{ 
                            backgroundColor: '#f0f0f0', 
                            color: '#666',
                            fontSize: '0.65rem',
                            padding: '0 4px',
                            height: '18px',
                            lineHeight: '18px'
                          }} 
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handlepayment}
                    type="primary"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={selectedSeats.length === 0}
                  >
                    Proceed to Payment
                  </Button>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  <p>Please select your seats</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Seat Selection Modal */}
      {showMobileSeatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center lg:hidden">
          <div className="bg-white p-4 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Select Seats</h3>
              <button 
                onClick={() => setShowMobileSeatModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Screen Indicator */}
            <div className="text-center mb-4">
              <div className="bg-gradient-to-r from-transparent via-blue-500 to-transparent h-1 rounded-full mx-auto mb-1"></div>
              <p className="text-gray-500 text-xs">SCREEN THIS WAY</p>
            </div>

            {/* Seats Grid */}
            <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto mb-4">
              <div className="min-w-max">
                {Array.from(new Set(seats.map(s => s.row_letter))).map(row => (
                  <div key={row} className="flex items-center mb-2">
                    <div className="w-6 text-center text-gray-500 font-semibold mr-2 text-xs">
                      {row}
                    </div>
                    <div className="flex flex-nowrap space-x-1">
                      {seats
                        .filter(seat => seat.row_letter === row)
                        .map(seat => (
                          <button
                            key={seat.seat_id}
                            className={`w-5 h-5 rounded-sm transition-all duration-200 text-[10px] font-medium ${getSeatClassName(seat)}`}
                            onClick={() => handleSeatClick(seat)}
                            disabled={!seat.is_active}
                          >
                            {seat.seat_number}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setShowMobileSeatModal(false)}
              type="primary"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Confirm Seats
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;