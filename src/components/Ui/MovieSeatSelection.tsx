import { useState } from "react";
import { Button, Badge, Divider } from "antd";
import { useNavigate } from "react-router-dom";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "occupied";
  price: number;
}

interface SeatSelectionProps {
  movieTitle: string;
  theaterName: string;
  showtime: string;
  onProceedToPayment: (selectedSeats: Seat[], total: number) => void;
}

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  
  rows.forEach((row, rowIndex) => {
    for (let num = 1; num <= 20; num++) {
      let type: "regular" | "premium" | "occupied" = "regular";
      let price = 200;
      
      // Premium seats in middle rows (D-G)
      if (rowIndex >= 3 && rowIndex <= 6) {
        type = "premium";
        price = 350;
      }
      
      // Random occupied seats
      if (Math.random() < 0.15) {
        type = "occupied";
      }
      
      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        type,
        price,
      });
    }
  });
  
  return seats;
};

const SeatSelection = () => {
  const [seats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const navigate = useNavigate();
 
const movieTitle = 'Avengers: Infinity';
const theaterName = 'PVR Cinemas - Phoenix MarketCity';
const showtime = '10:00 AM';
const onProceedToPayment = '';
  const handleSeatClick = (seat: Seat) => {
    if (seat.type === "occupied") return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        if (prev.length >= 10) return prev; // Max 10 seats
        return [...prev, seat];
      }
    });
  };

  const getSeatClassName = (seat: Seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (seat.type === "occupied") {
      return "bg-gray-400 cursor-not-allowed";
    }
    if (isSelected) {
      return "bg-blue-500 text-white cursor-pointer";
    }
    if (seat.type === "premium") {
      return "bg-yellow-500 hover:bg-yellow-600 cursor-pointer";
    }
    return "bg-gray-200 hover:bg-gray-300 cursor-pointer";
  };

  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const regularCount = selectedSeats.filter(s => s.type === "regular").length;
  const premiumCount = selectedSeats.filter(s => s.type === "premium").length;

  return (
    <div className="min-h-screen bg-white py-8 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{movieTitle}</h1>
          <p className="text-gray-600">{theaterName} • {showtime}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="xl:col-span-3">
            {/* Screen */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-transparent via-blue-500 to-transparent h-1 rounded-full mx-auto mb-2"></div>
              <p className="text-gray-500 text-sm">SCREEN THIS WAY</p>
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                <span className="text-sm text-gray-600">Premium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                <span className="text-sm text-gray-600">Occupied</span>
              </div>
            </div>

            {/* Seats Grid */}
            <div className="bg-gray-50 rounded-lg p-6">
              {Array.from(new Set(seats.map(s => s.row))).map(row => (
                <div key={row} className="flex items-center justify-center mb-3">
                  <div className="w-8 text-center text-gray-500 font-semibold mr-4">
                    {row}
                  </div>
                  <div className="flex space-x-2">
                    {seats
                      .filter(seat => seat.row === row)
                      .map(seat => (
                        <button
                          key={seat.id}
                          className={`w-6 h-6 rounded-sm transition-all duration-200 text-xs font-medium ${getSeatClassName(seat)}`}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.type === "occupied"}
                        >
                          {seat.number}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="xl:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md sticky top-8">
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
                        <Badge key={seat.id} count={seat.id} style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
                      ))}
                    </div>
                  </div>

                  <Button
                  onClick={()=>navigate('/movies/Booking/confirmation')}
                    type="primary"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    // onClick={() => onProceedToPayment(selectedSeats, total)}
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
    </div>
  );
};

export default SeatSelection;