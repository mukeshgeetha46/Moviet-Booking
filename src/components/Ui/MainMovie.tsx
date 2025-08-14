import { Outlet } from "react-router-dom";
import HeroSlider from "./HeroSlider";
import Navbar from "./Navbar";




export default function MainMovie(): React.ReactElement {
  return (
    <div>
      <Navbar />
      

      <div className="w-full mx-auto px-4 my-6">
       <Outlet />
      </div>
    </div>
  );
}
