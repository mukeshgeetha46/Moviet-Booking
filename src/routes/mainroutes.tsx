import BookingConfirmation from "../components/Ui/BookingConfirmation";
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
    { path:'movies/:moviename', element: <MovieDetails /> },
    { path:'movies/seat-layout', element: <SeatSelection /> },
    { path:'movies/buytickets', element: <TheaterSelection /> },
    { path:'movies/Booking/confirmation', element: <BookingConfirmation /> },
  ],
};



export { MainRoutes };
