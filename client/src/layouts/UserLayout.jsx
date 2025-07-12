import Header from "../partials/Header";
import { Outlet } from "react-router-dom";
import Footer from "../partials/Footer";

function UserLayout() {
  return (
    <div>
       <Header />
       <Outlet />
       <Footer /> 
    </div>
  )
}
export default UserLayout
