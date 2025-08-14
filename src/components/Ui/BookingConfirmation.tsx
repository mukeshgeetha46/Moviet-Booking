import { Button, Badge, Divider } from "antd";
import {
  CheckCircleFilled,
  DownloadOutlined,
  ShareAltOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface Seat {
  id: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "occupied";
  price: number;
}

interface BookingConfirmationProps {
  movieTitle: string;
  theaterName: string;
  showtime: string;
  selectedSeats: Seat[];
  total: number;
  bookingId: string;
  onBackToHome: () => void;
}

const BookingConfirmation = () => {
    const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const movieTitle = 'Avengers: Infinity';
  const theaterName = 'PVR Cinemas - Phoenix MarketCity';
    const showtime = '10:00 AM';
    const selectedSeats: Seat[] = [
        { id: 'A1', row: 'A', number: 1, type: 'regular', price: 200 },
        { id: 'A2', row: 'A', number: 2, type: 'premium', price: 350 }];
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const bookingId = 'ABC123456';

const onBackToHome =()=> {
navigate('/');
}

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <CheckCircleFilled className="text-green-500 text-5xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your tickets have been booked successfully</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6 border border-gray-200">
          {/* Booking ID */}
          <div className="text-center mb-6">
            <Badge count={`Booking ID: ${bookingId}`} style={{ 
              backgroundColor: '#f0f0f0',
              color: '#666',
              padding: '8px 16px',
              fontSize: '14px'
            }} />
          </div>

          {/* Movie Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{movieTitle}</h2>
              <p className="text-gray-600">{theaterName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <CalendarOutlined className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">{currentDate}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <ClockCircleOutlined className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold">{showtime}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <EnvironmentOutlined className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Screen</p>
                  <p className="font-semibold">Screen 1</p>
                </div>
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          {/* Seat Details */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Seat Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Selected Seats</p>
                <div className="flex flex-wrap gap-1">
                  {selectedSeats.map(seat => (
                    <Badge 
                      key={seat.id}
                      count={seat.id}
                      style={{ 
                        backgroundColor: seat.type === "premium" ? '#faad14' : '#f0f0f0',
                        color: seat.type === "premium" ? '#fff' : '#666'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Total Seats</p>
                <p className="font-semibold">{selectedSeats.length}</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Payment Summary</h3>
            <div className="space-y-2">
              {selectedSeats.filter(s => s.type === "regular").length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Regular ({selectedSeats.filter(s => s.type === "regular").length})
                  </span>
                  <span>₹{selectedSeats.filter(s => s.type === "regular").length * 200}</span>
                </div>
              )}
              {selectedSeats.filter(s => s.type === "premium").length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Premium ({selectedSeats.filter(s => s.type === "premium").length})
                  </span>
                  <span>₹{selectedSeats.filter(s => s.type === "premium").length * 350}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Convenience Fee</span>
                <span>₹30</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span className="text-blue-600">₹{total + 30}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button 
            icon={<DownloadOutlined />}
            className="flex items-center justify-center"
          >
            Download Ticket
          </Button>
          
          <Button 
            icon={<ShareAltOutlined />}
            className="flex items-center justify-center"
          >
            Booking List
          </Button>
          
          <Button 
            type="primary"
            onClick={onBackToHome}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Back to Home
          </Button>
        </div>

        {/* Important Notes */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Important Notes</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Please arrive at least 15 minutes before the show time</li>
            <li>• Carry a valid ID proof for verification</li>
            <li>• Outside food and beverages are not allowed</li>
            <li>• Mobile phones must be switched off during the movie</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;