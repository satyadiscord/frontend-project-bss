import { useState, useEffect } from "react";
import { Icons } from "../assets/IndexAssets";
import { sidebarList } from "../atom/ListMenu/SidebarList";
import { useLocation, useNavigate } from "react-router-dom";
import InterfaceProfile from "../pages/ProfilUser/InterfaceProfile";
import axios from "axios";
import DarkMode from "./DarkMode";
// import { PiDivideBold } from "react-icons/pi";

export default function NavbarDashboard() {
  const [isSideBar, setIsSideBar] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Filter daftar sidebar berdasarkan role
  const filteredSidebarList = sidebarList.filter((item) => {
    if (role === "student") {
      return (
        item.name === "Home" ||
        item.name === "Kelas" ||
        item.name === "Daftar Kelas"
      );
    } else if (role === "teacher") {
      return item.name !== "Daftar Kelas";
    }

    return true;
  });

  // const filteredSidebarList =
  //   role === "student"
  //     ? sidebarList.filter(
  //         (item) =>
  //           item.name === "Home" ||
  //           item.name === "Kelas" ||
  //           item.name === "Daftar Kelas"
  //       )
  //     : sidebarList;

  return (
    <>
      {/* utama navbar */}
      <div className="flex items-center justify-between w-full p-4 shadow-lg">
        <button onClick={() => setIsSideBar(!isSideBar)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 sm:w-7 sm:h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="flex justify-center items-center">
          <img
            src={Icons}
            alt="Univer icons"
            className="w-8 h-8 sm:w-11 sm:h-11"
          />
          <span className="hidden md:block font-semibold text-2xl text-center tracking-wide">
            Univer
          </span>
        </div>
        <div className="flex items-center md:gap-x-3 flex-row-reverse">
          <InterfaceProfile />
          <div className="hidden md:block">
            <DarkMode />
          </div>
        </div>
      </div>

      {/* latar gelap */}
      {isSideBar && (
        <div className="fixed w-full h-full bg-black z-30 bg-opacity-50"></div>
      )}

      {/* isi sidebar */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 ${
          isSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="flex items-center text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          onClick={() => setIsSideBar(!isSideBar)}
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {filteredSidebarList.map((data, index) => (
              <div key={index}>
                <li>
                  <div
                    onClick={() => {
                      navigate(data.link_navigate);
                      setIsSideBar(false);
                    }}
                    className={`flex items-center p-2 cursor-pointer rounded-lg group ${
                      location.pathname === data.link_navigate
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {data.list_icons}
                    <span className="ms-3">{data.name}</span>
                  </div>
                </li>
              </div>
            ))}
            <div className="flex items-center ml-[6px] md:hidden">
              <DarkMode />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
