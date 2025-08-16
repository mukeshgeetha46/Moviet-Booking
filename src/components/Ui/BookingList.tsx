import React, { useEffect, useState } from "react";
import BookingListLoginPrompt from "./BookingListLoginPrompt";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { CalendarOutlined, EnvironmentOutlined, FilePdfOutlined } from "@ant-design/icons";
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
  price: string;
  theater_name: string;
}

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}


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
     <>
<div className="w-full mx-auto p-1 md:p-4 lg:p-4 xl:p-4 mt-5 ">
<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
  {bookings.map((booking) => (
      
<div
      key={booking.booking_id}
      className="w-full  mx-auto bg-white shadow-md rounded-2xl border overflow-hidden"
    >
      <div className="flex gap-4 p-4">
        <img
          src={booking.image_url}
          alt="Movie Poster"
          className="w-24 h-36 object-cover rounded-lg"
        />

        <div className="flex flex-col flex-1 justify-between">
          <div>
            <h2 className="text-lg font-bold">{booking.title}</h2>
             <p className="text-sm text-gray-700 font-medium">
          {booking.theater_name}
        </p>
            <p className="text-xs text-gray-500">{`Hindi · Malayalam · Tamil`}</p>

            <div className="mt-2 flex items-center text-gray-600 text-sm gap-1">
              <CalendarOutlined className="text-gray-500" />
              <span>
                {formatDate(booking.movie_date)} | {booking.show_time}
              </span>
            </div>

            <div className="flex items-center text-gray-600 text-sm gap-1 mt-1">
              <EnvironmentOutlined className="text-gray-500" />
              <span>{booking.address}</span>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <p className="text-xs font-semibold text-gray-600">Seats:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                {Array.isArray(booking.booked_seats)
                  ? booking.booked_seats.join(", ")
                  : booking.booked_seats}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              <strong>Booked On:</strong> {formatDate(booking.movie_date)}
            </p>
            <p className="text-xs text-gray-500">
              <strong>Total Amount:</strong> ₹{booking.price}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-t">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          Booked
        </span>
        <button
          onClick={() =>
            navigate(`/movies/Booking/confirmation/${booking.booking_id}`)
          }
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm"
        >
          <FilePdfOutlined /> View Ticket
        </button>
      </div>
    </div>

    
  ))}
    </div>
</div>
</>
  );
}