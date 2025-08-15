import { Button, Badge, Divider, Alert } from "antd";
import {
  CheckCircleFilled,
  DownloadOutlined,
  ShareAltOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../../utils/FullPageLoader";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams } from "react-router-dom";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: "Standard" | "Premium" | "occupied";
  price: number;
}

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

interface BookingDetails {
  id: string;
  booking_id: string;
  title: string;
  theater_name: string;
  movie_date: string;
  show_time: string;
  ticket_count: string;
  booked_seats: string | Seat[];
  screen?: string;
}

const CONVENIENCE_FEE = 30;

const getParsedSeats = (seats: string | Seat[]): Seat[] => {
  if (typeof seats === 'string') {
    try {
      return JSON.parse(seats) as Seat[];
    } catch (e) {
      return [];
    }
  }
  return seats;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
  .replace(/(\w+), (\d+), (\w+), (\d+)/, '$1, $2 $3, $4');
};

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const params = useParams<{ booking_id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onBackToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<ApiResponse<BookingDetails>>(
          `movies/moviedetails/${params.booking_id}`
        );
        setBookingDetails(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, [params.booking_id]);

  if (isLoading) {
    return <FullPageLoader open={isLoading} message="Loading..." backdropOpacity={50} />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!bookingDetails) {
    return <div className="min-h-screen flex items-center justify-center">No booking details found</div>;
  }

  const seats = getParsedSeats(bookingDetails.booked_seats);
  const regularSeats = seats.filter(s => s.type === "Standard");
  const premiumSeats = seats.filter(s => s.type === "Premium");
  const subtotal = seats.reduce((sum, seat) => sum + seat.price, 0);
  const total = subtotal + CONVENIENCE_FEE;

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
            {`Booking ID: ${bookingDetails.booking_id}`}
          </div>

          {/* Movie Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{bookingDetails.title}</h2>
              <p className="text-gray-600">{bookingDetails.theater_name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <CalendarOutlined className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">{formatDate(bookingDetails.movie_date)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <ClockCircleOutlined className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold">{bookingDetails.show_time}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <EnvironmentOutlined className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Screen</p>
                  <p className="font-semibold">{bookingDetails.screen || 'Screen 1'}</p>
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
                  {seats.map((seat) => (
                    <Badge 
                      key={seat.id}
                      count={seat.id}
                      style={{ 
                        backgroundColor: seat.type === "Premium" ? '#faad14' : '#f0f0f0',
                        color: seat.type === "Premium" ? '#fff' : '#666'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Total Seats</p>
                <p className="font-semibold">{bookingDetails.ticket_count}</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Payment Summary</h3>
            <div className="space-y-2">
              {regularSeats.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Regular ({regularSeats.length})
                  </span>
                  <span>₹{regularSeats.reduce((sum, seat) => sum + seat.price, 0)}</span>
                </div>
              )}
              {premiumSeats.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Premium ({premiumSeats.length})
                  </span>
                  <span>₹{premiumSeats.reduce((sum, seat) => sum + seat.price, 0)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Convenience Fee</span>
                <span>₹{CONVENIENCE_FEE}</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span className="text-blue-600">₹{total}</span>
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
          onClick={()=>navigate('/movies/Booking/list')}
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