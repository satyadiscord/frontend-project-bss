import { useState } from "react";
import { Logins } from "../../assets/IndexAssets";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.data.token);

      setMessage("Login successful!");
      setNotificationType("success");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        setIsLoading(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setMessage(error.response.data.message || "An error occurred");
      } else {
        setMessage("Network error");
      }
      setNotificationType("error");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center object-cover"
        style={{ backgroundImage: `url(${Logins})` }}
      >
        <form
          onSubmit={handleSubmit}
          className="m-5 space-y-6 w-[550px] p-4 rounded-md bg-white bg-opacity-80"
        >
          <h1 className="font-semibold text-2xl mb-3">Login Form</h1>
          <hr />
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login to your account"}{" "}
          </button>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Not registered yet?{" "}
            <a
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>

        {/* Pop-up notifikasi */}
        {showNotification && (
          <div
            className={`fixed top-[150px] left-0 right-0 z-50 flex items-center justify-center`}
          >
            <div
              className={`p-3 rounded-md shadow-lg ${
                notificationType === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
