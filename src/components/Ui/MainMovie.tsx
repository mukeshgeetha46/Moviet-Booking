import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


export default function MainMovie(): React.ReactElement {


  return (
   <div>
  <Navbar />

  <div className="w-full mx-auto px-4 my-6 pt-16">
    <Outlet />
  </div>
</div>

  );
}
