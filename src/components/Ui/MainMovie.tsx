import { Outlet } from "react-router-dom";
import HeroSlider from "./HeroSlider";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";




export default function MainMovie(): React.ReactElement {
  const { user, logout } = useAuth();
  console.log('main movie user:', user);
  return (
   <div>
  <Navbar />

  <div className="w-full mx-auto px-4 my-6 pt-16">
    <Outlet />
  </div>
</div>

  );
}
