import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// icons
import { MdPerson } from "react-icons/md";

export default function InterfaceProfile() {
  const [isHoverProfil, setIsHoverProfil] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // get userdata
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
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsHoverProfil(true)}
        onMouseLeave={() => setIsHoverProfil(false)}
      >
        <button
          onClick={() => navigate("/profil")}
          className="w-[28px] h-[28px] sm:w-[33px] sm:h-[33px] border-2 border-slate-400 rounded-full bg-cover object-cover bg-center"
        >
          <MdPerson className="w-full h-full" />
        </button>
        {isHoverProfil && (
          <div className="absolute z-40 top-[58px] right-0 border-t-2 border-blue-500 bg-white shadow-lg p-3 dark:text-gray-700">
            {user.name}
          </div>
        )}
      </div>
    </>
  );
}
