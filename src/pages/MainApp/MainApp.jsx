import Footer from "../../component/Footer";
import NavbarDashboard from "../../component/navbar-dashboard";
import { Outlet } from "react-router-dom";
export default function MainApp() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavbarDashboard />
        <div
          className={`flex-grow w-[95%] lg:w-[86%] md:w-[90%] mt-6 mb-6 m-auto`}
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
