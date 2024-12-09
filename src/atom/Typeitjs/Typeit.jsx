import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TypeIt from "typeit";

export default function Typeit() {
  const [user, setUser] = useState({});
  const typeitRef = useRef(null); // berfungsi untuk mengakses Dom

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

  useEffect(() => {
    if (user.name) {
      new TypeIt(typeitRef.current, {
        strings: [`Welcome ${user.name}`],
        speed: 100, // Typing speed
      }).go();
    }
  }, [user.name]);

  return (
    <>
      <p
        ref={typeitRef}
        className="text-light text-slate-800 text-center lg:text-start dark:text-gray-200"
      ></p>
    </>
  );
}
