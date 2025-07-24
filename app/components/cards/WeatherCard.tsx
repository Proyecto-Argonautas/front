const WeatherCard = () => {
  return (
    <div className="m-auto my-10 duration-300 font-mono text-white group cursor-pointer relative overflow-hidden bg-[#DCDFE4] w-24 h-40 sm:w-28 sm:h-48 md:w-40 md:h-64 dark:bg-[#22272B] rounded-3xl p-2 sm:p-4 hover:w-40 hover:bg-blue-200 hover:dark:bg-[#0C66E4]">
      <h3 className="text-lg sm:text-xl text-center">Today</h3>
      <div className="gap-2 sm:gap-4 relative">
        <svg
          className="w-16 sm:w-20 scale-[110%]"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <title>Weather icon: sun and clouds</title>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="b"
              x1="16.5"
              x2="21.5"
              y1="19.67"
              y2="28.33"
            >
              <stop offset={0} stopColor="#fbbf24" />
              <stop offset=".45" stopColor="#fbbf24" />
              <stop offset={1} stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="c"
              x1="22.56"
              x2="39.2"
              y1="21.96"
              y2="50.8"
            >
              <stop offset={0} stopColor="#f3f7fe" />
              <stop offset=".45" stopColor="#f3f7fe" />
              <stop offset={1} stopColor="#deeafb" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="a"
              x1="22.53"
              x2="25.47"
              y1="42.95"
              y2="48.05"
            >
              <stop offset={0} stopColor="#4286ee" />
              <stop offset=".45" stopColor="#4286ee" />
              <stop offset={1} stopColor="#0950bc" />
            </linearGradient>
            <linearGradient
              id="d"
              x1="29.53"
              x2="32.47"
              xlinkHref="#a"
              y1="42.95"
              y2="48.05"
            />
            <linearGradient
              id="e"
              x1="36.53"
              x2="39.47"
              xlinkHref="#a"
              y1="42.95"
              y2="48.05"
            />
          </defs>
          <circle
            cx={19}
            cy={24}
            fill="url(#b)"
            r={5}
            stroke="#f8af18"
            strokeMiterlimit={10}
            strokeWidth=".5"
          />
          <path
            d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"
            fill="none"
            stroke="#fbbf24"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2}
          >
            <animateTransform
              attributeName="transform"
              dur="45s"
              repeatCount="indefinite"
              type="rotate"
              values="0 19 24; 360 19 24"
            />
          </path>
          <path
            d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"
            fill="url(#c)"
            stroke="#e6effc"
            strokeMiterlimit={10}
            strokeWidth=".5"
          />
          <path
            d="M24.39 43.03l-.78 4.94"
            fill="none"
            stroke="url(#a)"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2}
          >
            <animateTransform
              attributeName="transform"
              dur="0.7s"
              repeatCount="indefinite"
              type="translate"
              values="1 -5; -2 10"
            />
          </path>
          <path
            d="M31.39 43.03l-.78 4.94"
            fill="none"
            stroke="url(#d)"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2}
          >
            <animateTransform
              attributeName="transform"
              begin="-0.4s"
              dur="0.7s"
              repeatCount="indefinite"
              type="translate"
              values="1 -5; -2 10"
            />
          </path>
          <path
            d="M38.39 43.03l-.78 4.94"
            fill="none"
            stroke="url(#e)"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2}
          >
            <animateTransform
              attributeName="transform"
              begin="-0.2s"
              dur="0.7s"
              repeatCount="indefinite"
              type="translate"
              values="1 -5; -2 10"
            />
          </path>
        </svg>
        <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-3xl sm:text-5xl text-center group-hover:translate-x-8 group-hover:-translate-y-16 group-hover:scale-150">
          6°
        </h4>
      </div>
      <div className="absolute duration-300 -left-32 mt-2 group-hover:left-2 sm:group-hover:left-10">
        <p className="text-xs sm:text-sm">light rain</p>
        <p className="text-xs sm:text-sm">50% humidity</p>
      </div>
    </div>
  );
};

export default WeatherCard;
