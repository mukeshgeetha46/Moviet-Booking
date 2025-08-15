import AuthPage from "../components/Auth/Auth";
import BookingConfirmation from "../components/Ui/BookingConfirmation";
import BookingList from "../components/Ui/BookingList";
import MainMovie from "../components/Ui/MainMovie";
import MainPage from "../components/Ui/MainPage";
import MovieDetails from "../components/Ui/Moviedetails";
import SeatSelection from "../components/Ui/MovieSeatSelection";
import TheaterSelection from "../components/Ui/TheaterSelection";



// Routes with layout
const MainRoutes = {
  path: '/',
  element: <MainMovie />,
  children: [
    { index: true, element: <MainPage /> },
    { path:'movies/:moviename/:movieid', element: <MovieDetails /> },
    { path:'movies/seat-layout/:theater_id', element: <SeatSelection /> },
    { path:'movies/buytickets', element: <TheaterSelection /> },
    { path:'movies/Booking/confirmation/:booking_id', element: <BookingConfirmation /> },
    { path:'movies/Booking/list', element: <BookingList /> },
   
  ],
};


const AuthRoutes = {
  path: '/',
  children: [
     { path:'auth', element: <AuthPage /> },
  ],
};



export { MainRoutes,AuthRoutes };
