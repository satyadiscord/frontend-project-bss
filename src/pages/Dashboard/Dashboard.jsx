import { GambarBuku } from "../../assets/IndexAssets";
import Typeit from "../../atom/Typeitjs/Typeit";

export default function Dashboard() {
  return (
    <>
      <div className="w-[100%] m-auto">
        <div className="flex justify-between items-center flex-col lg:flex-row">
          <div>
            <h1 className="text-center lg:text-start font-bold font-serif text-3xl text-wrap">
              Pengembangan Sistem Informasi Pembelajaran
            </h1>
            <Typeit />
          </div>
          <div>
            <div
              className="w-[296px] h-[200px] sm:w-[490px] sm:h-[270px] md:w-[690px] lg:w-[500px] border bg-cover bg-center object-cover"
              style={{ backgroundImage: `url(${GambarBuku})` }}
            ></div>
          </div>
        </div>

        <div className="w-full h-[5px] bg-blue-500 mt-11 mb-3 rounded-full"></div>

        <section className="mt-10 lg:mt-16 sm:pl-2">
          <h1 className="text-2xl font-serif font-semibold">Abstrak</h1>
          <p className="text-base font-light text-slate-600 text-wrap dark:text-gray-300">
            Sistem informasi proses belajar mengajar online merupakan sistem
            pendidikan yang menggunakan aplikasi elektronik untuk mendukung
            pengembangan kegiatan belajar mengajar dengan media internet. Sistem
            Informasi ini memungkinkan terjadinya proses pendidikan tanpa
            melalui tatap muka langsung. Sistem informasi proses belajar
            mengajar online dengan menggunakan metode pembelajaran student
            centered learning di Politeknik Negeri Malang ini diterapkan pada
            Program Studi Teknik Informatika untuk memudahkan komunikasi antara
            dosen dan mahasiswa. Perhitungan dalam penerapan Simple Additive
            Weighting untuk mendapatkan nilai keaktifan mahasiswa memiliki 4
            kriteria yaitu presentasi, bertanya, menjawab, praktikum. Dalam uji
            coba penerapan Simple Additive Weighting ke dalam sistem belajar
            mengajar online ini dengan membandingkan hasil output sistem dan
            hasil pakar memiliki tingkat akurasi mencapai 100%. Sistem ini
            dirancang dan diimplementasikan dengan menggunakan PHP, MySQL, HTML,
            CSS, JavaScript dan Bootstrap. Sistem ini juga telah di uji coba
            oleh beberapa user dan hasilnya dapat disimpulkan bahwa aplikasi ini
            dapat membantu dosen dan mahasiswa berinteraksi secara online dalam
            kegiatan belajar mengajar.
          </p>
        </section>
      </div>
    </>
  );
}
