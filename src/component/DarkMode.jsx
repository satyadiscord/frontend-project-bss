import { useEffect, useState } from "react";

export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handlerDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    document.body.setAttribute("data-hs-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <>
      <button
        type="button"
        onClick={handlerDarkMode}
        className="hs-dark-mode-active:hidden block hs-dark-mode font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        data-hs-theme-click-value="dark"
      >
        <span className="group inline-flex shrink-0 justify-center items-center size-9">
          <svg
            className="shrink-0 size-6"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        </span>
      </button>
      <button
        type="button"
        onClick={handlerDarkMode}
        className="hs-dark-mode-active:block hidden hs-dark-mode font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        data-hs-theme-click-value="light"
      >
        <span className="group inline-flex shrink-0 justify-center items-center size-9">
          <svg
            className="shrink-0 size-6"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        </span>
      </button>
    </>
  );
}
