import { useState, useEffect } from "react";
import FetchKelasApi from "../../api/KelasApi/GetKelasApi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { IoChevronBack } from "react-icons/io5"; // IC back
import { MdDeleteOutline } from "react-icons/md"; // IC delete

export default function KelasDetail() {
  const { dataKelas, setDataKelas, isLoading } = FetchKelasApi(
    "http://127.0.0.1:8000/api/daftar-kelas"
  );
  // console.log("Result: ", dataKelas);
  const [isDelete, setIsDelete] = useState(false);
  const [role, setRole] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedKelas = dataKelas?.find((k) => k.id === parseInt(id));

  // useEffect Role
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // create handlerDelete
  const handlerDelete = async (id) => {
    if (window.confirm("Apakah anda yakin menghapus data ini?")) {
      setIsDelete(true);
      try {
        await axios.delete(`http://127.0.0.1:8000/api/detail-kelas/${id}`);
        setDataKelas(dataKelas.filter((items) => items.id !== id));
        alert("Data Siswa berhasil dihapus.");
        window.location.reload();
      } catch (err) {
        console.log("Terjadi kesalahan saat melakukan penghapusan data: ", err);
        alert("Error fetching data kelas");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex items-center justify-center min-h-screen">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        selectedKelas && (
          <>
            <div className="flex justify-end items-center ">
              <div className="relative group inline-block">
                <button
                  onClick={() => navigate("/kelas")}
                  type="button"
                  className="border rounded-full py-1 px-2 hover:bg-red-600 hover:text-white transition duration-300"
                >
                  <IoChevronBack size={25} />
                </button>
                {/* Tooltip */}
                <div className="absolute right-6 top-9 mb-2 hidden group-hover:block bg-gray-500 text-white text-xs rounded px-4 py-1 z-10">
                  Kembali
                </div>
              </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
              <div className="flex justify-between items-center p-3">
                <h1 className="text-2xl font-bold font-[arial] tracking-wide">
                  Detail Kelas {selectedKelas.nama_kelas}
                </h1>
              </div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-10 py-3">
                      Nama Siswa
                    </th>
                    <th scope="col" className="px-10 py-3">
                      Matapelajaran
                    </th>
                    <th scope="col" className="px-10 py-3">
                      Pendidikan
                    </th>
                    <th scope="col" className="px-10 py-3">
                      Ruang Kelas
                    </th>
                    <th scope="col" className="px-10 py-3">
                      Status Kelas
                    </th>
                    <th scope="col" className="px-10 py-3">
                      {""}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedKelas.detailkelas.length > 0 ? (
                    selectedKelas.detailkelas.map((siswa, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {siswa.nama_siswa}
                        </th>
                        <td className="px-10 py-4">{siswa.mapel}</td>
                        <td className="px-10 py-4">{siswa.pendidikan}</td>
                        <td className="px-10 py-4">{siswa.ruang_kelas}</td>
                        <td className="px-10 py-4">
                          {selectedKelas?.jumlah_siswa === 20
                            ? "Penuh"
                            : "Tersisa"}
                        </td>
                        <td className="px-10 py-4">
                          <div className="relative group inline-block">
                            <button
                              onClick={() => handlerDelete(siswa.id)}
                              disabled={isDelete}
                              href="#"
                              className={`font-medium text-red-600 dark:text-red-500 hover:underline ${
                                role === "student" ? "hidden" : "block"
                              }`}
                            >
                              <MdDeleteOutline size={24} />
                            </button>
                            <div className="absolute right-6 top-1 mb-2 hidden group-hover:block bg-gray-500 text-white text-xs rounded px-4 py-1 z-10">
                              Delete
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center px-10 py-4 text-gray-500">
                        Tidak ada siswa dalam kelas ini
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )
      )}
    </>
  );
}
