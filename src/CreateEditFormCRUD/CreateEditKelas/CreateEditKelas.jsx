import { useNavigate } from "react-router-dom";
import { guruOption } from "../../atom/OptionList/GuruOption";

export default function CreateEditKelas() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-center font-bold text-2xl font-[arial] mt-10 mb-7">
        Edit Kelas
      </h1>
      <form className="w-[40%] m-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="nama_kelas"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="nama_kelas"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nama Kelas
          </label>
        </div>
        {/* option guru pengajar */}
        <div className="relative z-0 w-full mb-7 group">
          <label htmlFor="guru" className="sr-only">
            Pilih Guru
          </label>
          <select
            id="guru"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Pilih Guru</option>
            {guruOption.map((dat, index) => (
              <option key={index} value={dat.nama_guru}>
                {dat.nama_guru}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-7 group">
          <input
            type="number"
            id="jumlah_siswa"
            value="0"
            readOnly
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="jumlah_siswa"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Jumlah siswa
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            id="semester"
            value="1"
            readOnly
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="semester"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Semester
          </label>
        </div>

        {/* button */}
        <div className="flex items-center mt-16">
          <button
            type="submit"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate("/kelas")}
            className="focus:outline-none text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-red-900"
          >
            Batal
          </button>
        </div>
      </form>
    </>
  );
}
