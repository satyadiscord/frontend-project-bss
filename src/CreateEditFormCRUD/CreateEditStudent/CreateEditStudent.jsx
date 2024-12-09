import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// List Option
import { jurusanOption } from "../../atom/OptionList/JurusanOption";
import { tingkatPendidikan } from "../../atom/OptionList/PendidikanOption";
import { MapelOption } from "../../atom/OptionList/MapelOption";

export default function CreateEditStudent() {
  const [nama_student, setNamaStudent] = useState("");
  const [nis, setNis] = useState("");
  const [email, setEmail] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [nomber_telpon, setNomberTelpon] = useState("");
  const [tingkat_pendidikan, setTingkatPendidikan] = useState("");
  const [matapelajaran, setMatapelajaran] = useState("");
  const [orangtua, setOrangtua] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/siswasekolah/${id}`)
        .then((response) => {
          const data = response.data;
          setNamaStudent(data.nama_student);
          setNis(data.nis);
          setEmail(data.email);
          setTanggalLahir(data.tanggal_lahir);
          setAlamat(data.alamat);
          setJurusan(data.jurusan);
          setJenisKelamin(data.jenis_kelamin);
          setNomberTelpon(data.nomber_telpon);
          setTingkatPendidikan(data.tingkat_pendidikan);
          setMatapelajaran(data.matapelajaran);
          setOrangtua(data.orangtua);
        })
        .catch((err) => console.log("Fetch data gagal: ", err));
    }
  }, [id]);

  // axios post
  const handlerSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      nama_student,
      nis,
      email,
      tanggal_lahir,
      alamat,
      jurusan,
      jenis_kelamin,
      nomber_telpon,
      tingkat_pendidikan,
      matapelajaran,
      orangtua,
    };

    try {
      if (id) {
        await axios.put(
          `http://127.0.0.1:8000/api/siswasekolah/${id}`,
          updateData
        );
        alert("Update data student berhasil!");
        navigate("/student");
      }
    } catch (err) {
      console.log("Request Failed: ", err);
      alert("Terjadi kesalahan, tolong cek data anda kembali");
    }
  };

  // mengatasi input nis 4 digit
  const handleChangeNis = (e) => {
    const { value } = e.target;
    if (value.length <= 4 && /^[0-9]*$/.test(value)) {
      setNis(value);
    }
  };

  const handleBlurNis = () => {
    if (nis.length !== 4) {
      alert("NIS harus terdiri dari 4 angka.");
      setNis("");
    }
  };

  // mengatasi nomber telepon hingga digit 7-15
  const handleChangeTelpon = (e) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value) && value.length <= 15) {
      setNomberTelpon(value);
    }
  };

  const handleBlurTelpon = () => {
    if (nomber_telpon.length < 7) {
      alert("Nomor telepon harus terdiri dari minimal 7 angka.");
    }
  };

  return (
    <>
      <h1 className="text-center font-bold text-2xl font-[arial]">
        Perbarui Student
      </h1>
      <form
        onSubmit={handlerSubmit}
        className="w-[88%] md:w-[60%] lg:w-[40%] m-auto mt-16 md:mt-28"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            value={nama_student}
            onChange={(e) => setNamaStudent(e.target.value)}
            id="nama_student"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="nama_student"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nama
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            value={nis}
            onChange={handleChangeNis}
            onBlur={handleBlurNis}
            id="nis"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="nis"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nis
          </label>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            value={tanggal_lahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
            id="tanggal_lahir"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="tanggal_lahir"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tanggal Lahir
          </label>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input
            type="text"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            id="alamat"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="alamat"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Alamat Rumah
          </label>
        </div>

        {/* option jurusan */}
        <div>
          <label htmlFor="jurusan" className="sr-only">
            Pilih Jurusan
          </label>
          <select
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            id="jurusan"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Jurusan</option>
            {jurusanOption.map((dat, index) => (
              <option key={index} value={dat.nama_jurusan}>
                {dat.nama_jurusan}
              </option>
            ))}
          </select>
        </div>

        {/* option RADIO jenis kelamin */}
        <div className="flex justify-around items-center mt-7 mb-7">
          <div className="flex items-center">
            <input
              id="laki"
              type="radio"
              value="Laki-Laki"
              name="gender"
              onChange={(e) => setJenisKelamin(e.target.value)}
              checked={jenis_kelamin === "Laki-Laki"}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="laki"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Laki-Laki
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="perempuan"
              type="radio"
              value="Perempuan"
              name="gender"
              onChange={(e) => setJenisKelamin(e.target.value)}
              checked={jenis_kelamin === "Perempuan"}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="perempuan"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Perempuan
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input
            type="number"
            id="nomber_telpon"
            value={nomber_telpon}
            onChange={handleChangeTelpon}
            onBlur={handleBlurTelpon}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="nomber_telpon"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nomber Telpon
          </label>
        </div>
        {/* option pilih pendidikan */}
        <div className="mb-6">
          <label htmlFor="pendidikan" className="sr-only">
            Pilih Pendidikan
          </label>
          <select
            id="pendidikan"
            value={tingkat_pendidikan}
            onChange={(e) => setTingkatPendidikan(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Pendidikan</option>
            {tingkatPendidikan.map((dat, index) => (
              <option key={index} value={dat.tingkat_pendidikan}>
                {dat.tingkat_pendidikan}
              </option>
            ))}
          </select>
        </div>
        {/* option matapelajaran */}
        <div className="mb-6">
          <label htmlFor="matapelajaran" className="sr-only">
            Pilih Matapelajaran
          </label>
          <select
            id="matapelajaran"
            value={matapelajaran}
            onChange={(e) => setMatapelajaran(e.target.value)}
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="orangtua_wali"
            value={orangtua}
            onChange={(e) => setOrangtua(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="orangtua_wali"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nama Orangtua/Wali
          </label>
        </div>
        <div className="flex items-center mt-16">
          <button
            type="submit"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Perbarui
          </button>
          <button
            onClick={() => navigate("/student")}
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
