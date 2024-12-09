import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Registers } from "../../assets/IndexAssets";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Hook untuk navigasi

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validasi password
    if (password !== passwordConfirmation) {
      setMessage("Passwords do not match");
      setShowPopup(true);
      setIsLoading(false);
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      });

      // console.log("result data: ", response);

      setMessage("Registration successful");
      setSuccess(true);
      setShowPopup(true);
      setIsLoading(false);

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");

      // Menuju ke halaman login setelah 1 detik
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;

        // Cek apakah nama sudah digunakan
        if (errorMessage === "The name has already been taken.") {
          setMessage(
            "The name is already in use, please choose a different name."
          );
        } else {
          setMessage(errorMessage || "An error occurred");
        }

        setSuccess(false);
        setShowPopup(true);
      } else {
        setMessage("Network error");
        setSuccess(false);
        setShowPopup(true);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center p-2 min-h-screen bg-cover bg-center object-cover"
        style={{ backgroundImage: `url(${Registers})` }}
      >
        <form
          className="mt-8 space-y-6 w-[550px] p-4 shadow-2xl rounded-md bg-white bg-opacity-80"
          onSubmit={handleSubmit}
        >
          <h1 className="font-semibold text-2xl mb-3">Register Form</h1>
          <hr />
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
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
              id="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirmation Your Password
            </label>
            <input
              type="password"
              id="confirmation"
              placeholder="********"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="flex justify-center items-center flex-col gap-y-8">
            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={isLoading}
            >
              {isLoading ? "Register..." : "Register account"}{" "}
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-slate-500 text-base hover:underline"
            >
              Back
            </button>
          </div>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {success ? "Success!" : "Error"}
            </h2>
            <p>{message}</p>
            <button
              onClick={() => {
                if (success) {
                  setShowPopup(navigate("/login"));
                } else {
                  setShowPopup(false);
                }
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              {success ? "Oke" : "Close"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
