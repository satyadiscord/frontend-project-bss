import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// option list IMPORT
import { tingkatPendidikan } from "../../atom/OptionList/PendidikanOption";

export default function ReqKelas() {
  const [nama_siswa, setNamaSiswa] = useState("");
  const [mapel, setMapel] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [ruang_kelas, setRuangKelas] = useState("");
  const [daftar_kelas_id, setDaftarKelasId] = useState("");
  const [getNameKelas, setGetNameKelas] = useState([]);

  const navigate = useNavigate();

  // get kelas
  useEffect(() => {
    async function getFetchingKelas() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/daftar-kelas"
        );
        // console.log("Result response: ", response.data);
        setGetNameKelas(response.data);
      } catch (error) {
        console.log("Error Response get kelas: ", error);
      }
    }
    getFetchingKelas();
  }, []);

  async function handlerSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/detail-kelas",
        {
          nama_siswa,
          mapel,
          pendidikan,
          ruang_kelas,
          daftar_kelas_id,
        }
      );
      // console.log("Result response: ", response);
      if (response.status === 201) {
        alert("Request kelas berhasil. data anda akan masuk di KELAS");
        navigate("/kelas");
      }
    } catch (error) {
      console.log("Error fetching data in request kelas: ", error.message);
      alert("Terjadi kesalahan, tolong cek data anda kembali");
    }
  }

  return (
    <>
      <h1 className="text-center font-bold text-2xl font-[arial]">
        Daftar Kelas
      </h1>
      <form
        onSubmit={handlerSubmit}
        className="w-[88%] md:w-[60%] lg:w-[40%] m-auto mt-16 md:mt-28"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            value={nama_siswa}
            onChange={(e) => setNamaSiswa(e.target.value)}
            id="nama_siswa"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="nama_siswa"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nama Siswa
          </label>
        </div>
        {/* option pemilihan mapel */}
        <div className="mb-6">
          <label htmlFor="matapelajaran" className="sr-only">
            Pilih Matapelajaran
          </label>
          <select
            value={mapel}
            onChange={(e) => setMapel(e.target.value)}
            id="matapelajaran"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Matapelajaran</option>
            <option value="Matematika">Matematika</option>
            <option value="Ipa">Ipa</option>
            <option value="Bahasa Inggris">Bahasa Inggris</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            <option value="Ips">Ips</option>
            <option value="Sejarah">Sejarah</option>
          </select>
        </div>
        {/* option pendidikan */}
        <div className="mb-6">
          <label htmlFor="pendiidkan" className="sr-only">
            Pilih Tingkat Pendidikan
          </label>
          <select
            value={pendidikan}
            onChange={(e) => setPendidikan(e.target.value)}
            id="pendiidkan"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Tingkat Pendidikan</option>
            {tingkatPendidikan.map((dat, index) => (
              <option key={index} value={dat.tingkat_pendidikan}>
                {dat.tingkat_pendidikan}
              </option>
            ))}
          </select>
        </div>
        {/* option ruang kelas */}
        <div className="mb-7">
          <label htmlFor="ruangan_kelas" className="sr-only">
            Pilih Ruangan
          </label>
          <select
            value={ruang_kelas}
            onChange={(e) => setRuangKelas(e.target.value)}
            id="ruangan_kelas"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Ruangan</option>
            <option value="Lab">Lab</option>
            <option value="Aula">Aula</option>
            <option value="Komputer">Komputer</option>
            <option value="Perpustakaan">Perpustakaan</option>
          </select>
        </div>

        {/* option kelas */}
        <div>
          <label htmlFor="kelas_option" className="sr-only">
            Pilih Kelas
          </label>
          <select
            value={daftar_kelas_id}
            onChange={(e) => setDaftarKelasId(e.target.value)}
            id="kelas_option"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Kelas</option>
            {getNameKelas.map((dat, index) => (
              <option
                key={index}
                value={dat.nama_kelas}
                disabled={dat.jumlah_siswa >= 20}
              >
                {dat.nama_kelas} {dat.jumlah_siswa >= 20 ? "(Penuh)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* button */}
        <div className="flex items-center mt-16">
          <button
            type="submit"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Daftar
          </button>
        </div>
      </form>
    </>
  );
}
