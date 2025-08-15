import React, { useEffect, useState } from "react";
import BookingListLoginPrompt from "./BookingListLoginPrompt";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
type BookingStatus = "REFUNDED" | "PAYMENT_PENDING" | "PAYMENT_FAILED";

interface Booking {
  id: number;
  booking_id: string;
  title: string;
  image_url: string;
  languages: string;
  created_at: string;
  showDate: string;
  show_time: string;
  address: string;
  ticket_count: string;
  screen: string;
  status: BookingStatus;
  statusMessage: string;
  movie_date: string;
  booked_seats: string;
}

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case "REFUNDED":
      return "bg-green-500";
    case "PAYMENT_PENDING":
      return "bg-gradient-to-r from-purple-400 to-blue-400";
    case "PAYMENT_FAILED":
      return "bg-gradient-to-r from-purple-400 to-blue-400";
    default:
      return "bg-[#03fc17]";
  }
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

// utils/dateFormatter.ts
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Check for invalid date
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
  // Split the formatted string and rearrange it
  const parts = formattedDate.split(', ');
  const datePart = parts[0];
  const timePart = parts[1].replace(/(AM|PM)/, '').trim();
  const period = parts[1].includes('AM') ? 'AM' : 'PM';
  
  return `${datePart}, ${timePart} ${period}`;
};

export default function BookingList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<Booking[]>>(`/bookings`);
        console.log('fetched bookings:', response.data.data);
        setBookings(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings");
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return <BookingListLoginPrompt />;
  }

  if (isLoading) {
    return <div className="max-w-lg mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-lg mx-auto p-4 text-red-500">{error}</div>;
  }

  if (bookings.length === 0) {
    return <div className="max-w-lg mx-auto p-4">No bookings found</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.booking_id}
          className="bg-white rounded-lg shadow p-4 border border-gray-200"
        >
          <p className="text-sm text-gray-500">
            Ordered on: {formatDateTime(booking.created_at)}
          </p>
          <div className="flex gap-4 mt-2">
            {/* Movie Poster */}
            <img
              src={booking.image_url}
              alt={booking.title}
              className="w-16 h-20 object-cover rounded"
            />
            {/* Details */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{booking.title}</h2>
              <p className="text-gray-500">{booking.languages}</p>
              <p className="text-sm font-medium">
                {formatDate(booking.movie_date)} | {booking.show_time}
              </p>
              <p className="text-sm text-gray-600">{booking.address}</p>
              <p className="text-sm text-gray-600">{`${booking.ticket_count} tickets`}</p>
              <p className="text-sm font-medium">{`Seats :${booking.booked_seats}`}</p>

              {/* Status */}
             <div className="flex items-center space-x-2 mt-2">
               <div
                className={`text-white text-xs px-2 py-1 mt-2 rounded w-fit bg-green-500`}
              >
                {booking.status}
              </div>
              <div
              onClick={()=>navigate(`/movies/Booking/confirmation/${booking.booking_id}`)}
                className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow`}
              >
                View Ticket
              </div>
             </div>
              <p className="text-xs text-gray-500 mt-1">
                {booking.statusMessage}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}