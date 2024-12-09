import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// option list IMPORT
import { MapelOption } from "../../atom/OptionList/MapelOption";
import { hariOption } from "../../atom/OptionList/HariOption";
import { guruOption } from "../../atom/OptionList/GuruOption";
import { tempatOption } from "../../atom/OptionList/TempatOption";
import { pengajaranOption } from "../../atom/OptionList/PengajaranOption";

export default function CreateEditMapel() {
  const [nama_matapelajaran, setNamaMatapelajaran] = useState("");
  const [hari, setHari] = useState("");
  const [waktu_mulai, setWaktuMulai] = useState("");
  const [waktu_selesai, setWaktuSelesai] = useState("");
  const [nama_guru, setNamaGuru] = useState("");
  const [ruang_kelas, setRuangKelas] = useState("");
  const [metode_pembelajaran, setMetodePembelajaran] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); //params

  // useEffect
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/mata-kuliahs/${id}`)
        .then((response) => {
          const data = response.data;
          setNamaMatapelajaran(data.nama_matapelajaran);
          setHari(data.hari);
          setWaktuMulai(data.waktu_mulai);
          setWaktuSelesai(data.waktu_selesai);
          setNamaGuru(data.nama_guru);
          setRuangKelas(data.ruang_kelas);
          setMetodePembelajaran(data.metode_pembelajaran);
          setDeskripsi(data.deskripsi);
        })
        .catch((err) =>
          console.log("Terjadi masalah saat melakukan fetching: ", err)
        );
    }
  }, [id]);

  function handlerSubmit(e) {
    e.preventDefault(); // Prevent page refresh on submit

    // waktu
    const formattedWaktuMulai = waktu_mulai.slice(0, 5);
    const formattedWaktuSelesai = waktu_selesai.slice(0, 5);

    const payload = {
      nama_matapelajaran,
      hari,
      waktu_mulai: formattedWaktuMulai,
      waktu_selesai: formattedWaktuSelesai,
      nama_guru,
      ruang_kelas,
      metode_pembelajaran,
      deskripsi,
    };

    if (id) {
      // Update (PUT) request
      axios
        .put(`http://127.0.0.1:8000/api/mata-kuliahs/${id}`, payload)
        .then(() => {
          alert("Data berhasil diperbarui");
          navigate("/matapelajaran"); // Navigate to matapelajaran page
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          alert("Terjadi kesalahan, tolong cek data anda kembali");
        });
    }
  }

  return (
    <>
      <h1 className="text-center font-bold text-2xl font-[arial]">
        Perbarui Matapelajaran
      </h1>
      <form
        onSubmit={handlerSubmit}
        className="w-[88%] md:w-[60%] lg:w-[40%] m-auto mt-16 md:mt-28"
      >
        <div className="mb-6">
          <label htmlFor="matapelajaran" className="sr-only">
            Pilih Matapelajaran
          </label>
          <select
            value={nama_matapelajaran}
            onChange={(e) => setNamaMatapelajaran(e.target.value)}
            id="matapelajaran"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Matapelajaran</option>
            {MapelOption.map((dat, index) => (
              <option key={index} value={dat.nama_mapel}>
                {dat.nama_mapel}
              </option>
            ))}
          </select>
        </div>
        {/* option hari */}
        <div>
          <label htmlFor="hari" className="sr-only">
            Pilih Hari
          </label>
          <select
            id="hari"
            value={hari}
            onChange={(e) => setHari(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Hari Dilaksanakan</option>
            {hariOption.map((dat, index) => (
              <option key={index} value={dat.nama_hari}>
                {dat.nama_hari}
              </option>
            ))}
          </select>

          {/* Pemilihan Waktu Mulai */}
          <div className="relative z-0 w-full mb-9 mt-10 group">
            <input
              type="time"
              id="waktu_mulai"
              value={waktu_mulai}
              onChange={(e) => setWaktuMulai(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="waktu_mulai"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Waktu Mulai
            </label>
          </div>
        </div>
        {/* Waktu Selesai */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="time"
            id="waktu_selesai"
            value={waktu_selesai}
            onChange={(e) => setWaktuSelesai(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="waktu_selesai"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Waktu Selesai
          </label>
        </div>
        {/* membuat opsi nama guru yang sudah terdaftar */}
        <div className="mb-6">
          <label htmlFor="nama_guru" className="sr-only">
            Pilih Nama Guru
          </label>
          <select
            id="nama_guru"
            value={nama_guru}
            onChange={(e) => setNamaGuru(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Nama Guru</option>
            {guruOption.map((dat, index) => (
              <option key={index} value={dat.nama_guru}>
                {dat.nama_guru}
              </option>
            ))}
          </select>
        </div>
        {/* option untuk ruangan kelas */}
        <div className="mb-6">
          <label htmlFor="ruangan" className="sr-only">
            Pilih Tempat
          </label>
          <select
            id="ruangan"
            value={ruang_kelas}
            onChange={(e) => setRuangKelas(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Tempat</option>
            {tempatOption.map((dat, index) => (
              <option key={index} value={dat.lokasi}>
                {dat.lokasi}
              </option>
            ))}
          </select>
        </div>
        {/* Metode Pengajaran */}
        <div className="mb-6">
          <label htmlFor="metode_pengajaran" className="sr-only">
            Pilih Metode Pengajaran
          </label>
          <select
            id="metode_pengajaran"
            value={metode_pembelajaran}
            onChange={(e) => setMetodePembelajaran(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Metode Pengajaran</option>
            {pengajaranOption.map((dat, index) => (
              <option key={index} value={dat.metode}>
                {dat.metode}
              </option>
            ))}
          </select>
        </div>
        {/* Deskripsi */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="deskripsi"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Deskripsi
          </label>
        </div>
        {/* button */}
        <div className="flex items-center mt-16">
          <button
            type="submit"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Perbarui
          </button>
          <button
            onClick={() => navigate("/matapelajaran")}
            type="button"
            className="focus:outline-none text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-red-900"
          >
            Batal
          </button>
        </div>
      </form>
    </>
  );
}
