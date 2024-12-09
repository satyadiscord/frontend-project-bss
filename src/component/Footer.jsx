import { listFooterIcons } from "../atom/ListFooter/ListFooterIc";
import { Icons } from "../assets/IndexAssets";

export default function Footer() {
  return (
    <>
      <footer className="bg-white rounded-lg shadow-inner dark:bg-gray-900">
        <div className="w-full max-w-screen-xl mx-auto p-1 md:py-8 sm:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={Icons} className="h-8" alt="Univer Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Univer
              </span>
            </a>
            <ul className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              {listFooterIcons.map((data, index) => (
                <div key={index}>
                  <li>
                    <a href={data.footer_link}>
                      <button className="me-4 md:me-6 hover:text-blue-600">
                        {data.footer_icon}
                      </button>
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
