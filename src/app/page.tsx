"use client"

import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { Block } from "aria-ease";
import Header from "@/components/header/Header";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { DarkModeContext } from "../components/DarkModeProvider";

const slides = [
  {
    image: "/assets/images/krea.webp",
    title: "WAN 2.2 Image generation",
    description: "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional promp adherence and ultra-realistic texture.",
    button: "Try WAN 2.2",
  },
  {
    image: "/assets/images/krea.webp",
    title: "FLUX.1 Krea",
    description: "We're making the weights to our FLUX1 Krea model open-source. Download and run our model weights, read the technical report, or generate with it in Krea Image.",
    button: "Try FLUX.1 Krea",
  }
];

export default function Home() {
  const[current, setCurrent] = useState(0);
  const prev = () => setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
  const next = () => setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
  const [windowWidth, setWindowWidth] = useState(0);

  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const createAccessibleBlock = () => {
      Block.makeBlockAccessible("body-div", "block-interactive");
    }

    createAccessibleBlock();
  }, [])

  const getTranslate = () => {
    if (typeof window !== "undefined" && windowWidth >= 1024) {
      return `-${current * 36.666}%`;
    }
    return `-${current * 100}%`;
  }

  return (
    <div id="body-div" className="black-bg min-h-[100vh] pb-10">
      <Header/>
      <main className="">
        
        <div className="w-full flex flex-col items-center mt-10 px-5">
          <div className="relative h-[320px] overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 pr-1 lg:pr-10"
              style={{
                width: windowWidth >= 1024 ? `calc(${slides.length} * 51.6667%)` : "100%",
                transform: `translateX(${getTranslate()})`,
              }}
            >
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={
                    `relative w-full flex-shrink-0 h-[320px] rounded-2xl overflow-hidden shadow-lg lg:w-2/3 ${idx !== slides.length - 1 ? 'mr-1 lg:mr-10' : ''}`
                  }
                  style={{
                    ...(windowWidth >= 1024
                    ? { minWidth: "66.6667%", maxWidth: "66.6667%" }
                    : {})
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    className="object-cover rounded-2xl"
                    fill
                    priority={idx === current}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h2 className="text-3xl font-bold text-gray-100 mb-2">{slide.title}</h2>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="text-gray-100 text-sm mb-0 max-w-xs">{slide.description}</p>
                      <button className="bg-white px-4 py-2 text-black text-[0.7rem] font-semibold flex items-center justify-center rounded-2xl whitespace-nowrap">{slide.button}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-4 w-full">
            <div className="w-2/4 flex-grow flex items-center justify-end">
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === current ? (darkMode ? 'bg-gray-100' : 'bg-black') : (darkMode ? 'bg-gray-700' : 'bg-gray-300')}`}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
            <div className="w-2/4 flex items-center justify-end flex-grow gap-2">
              <button onClick={prev} className="bg-gray-100 gray-bg rounded-full p-2 transition z-10 block-interactive" aria-label="Previous slide">
                <ChevronLeft className="w-3 h-3 text-gray-700 dark-text" />
              </button>
              <button onClick={next} className="bg-gray-100 gray-bg rounded-full p-2 transition z-10 block-interactive" aria-label="Next slide">
                <ChevronRight className="w-3 h-3 text-gray-700 dark-text" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 px-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold dark-text">Generate</h3>
            <button className="block-interactive text-blue-700 text-[0.7rem] flex items-center gap-[2px] p-1 rounded-lg">
              <ChevronDown height={15} width={15}/>
              <span>Show all</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 items-center gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-[42px] h-[42px] images-div rounded-lg flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.4763 9.85043C10.4763 10.8104 9.69763 11.589 8.73768 11.589C7.77772 11.589 7 10.8104 7 9.85043C7 8.89049 7.77772 8.11182 8.73768 8.11182C9.69763 8.11182 10.4754 8.88955 10.4763 9.84856V9.85043Z" fill="currentColor"></path><rect x="2.75" y="3.86182" width="18.5" height="16.5" rx="3.25" stroke="currentColor" strokeWidth="1.5"></rect><path d="M15.758 13.1118C17.5271 13.1118 19.1544 14.6938 20 15.4766V19.1118H4C4 19.1118 5.29914 17.0464 6.6586 16.0349C8.01806 15.0235 9.56678 16.6015 11.2673 16.6015C12.9687 16.6015 13.9898 13.1118 15.758 13.1118Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="dark-text text-[0.9rem] font-semibold">Images</h4>
                    <div className="bg-[#0D65FD] px-[5px] rounded-lg text-white font-semibold text-[0.7rem]"><span>New</span></div>
                  </div>
                  <p className="text-gray-600 dark-text text-[0.8rem] max-w-[15rem]">Generate images with custom styles in Flux and Videogram.</p>
                </div>
              </div>
              <button className="text-[0.7rem] rounded-xl bg-gray-100 gray-bg dark-text px-4 py-1 font-medium">Open</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-[42px] h-[42px] bg-[#ffa700] rounded-lg flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22.263 7.17399C21.637 6.41199 20.506 6.30099 19.743 6.92499L18.5167 7.92894C18.2593 8.13966 18.1409 8.46318 18.1571 8.79542C18.1589 8.83351 18.16 8.872 18.16 8.91099V15.312C18.16 15.3533 18.1588 15.3941 18.1568 15.4344C18.14 15.7656 18.2584 16.0881 18.5146 16.2987L19.729 17.297C20.045 17.558 20.448 17.701 20.863 17.701C21.849 17.701 22.654 16.899 22.657 15.912L22.669 8.31399C22.67 7.89899 22.527 7.49299 22.263 7.17399Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M12.6444 5.11182H5.68203C3.08003 5.11182 1.33203 6.93982 1.33203 9.66182V15.0618C1.33203 17.7838 3.08003 19.6118 5.68203 19.6118H12.6434C15.2474 19.6118 16.9964 17.7838 16.9964 15.0618V9.66182C16.9964 6.93982 15.2474 5.11182 12.6444 5.11182Z" fill="currentColor"></path><rect x="1" y="5.11182" width="16" height="15" rx="4" fill="currentColor"></rect></svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="dark-text text-[0.9rem] font-semibold">Video</h4>
                  </div>
                  <p className="text-gray-600 dark-text text-[0.8rem] max-w-[15rem]">Generate images with custom styles in Flux and Videogram.</p>
                </div>
              </div>
              <button className="text-[0.7rem] rounded-xl bg-gray-100 gray-bg dark-text px-4 py-1 font-medium">Open</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-[42px] h-[42px] bg-red-400 rounded-lg flex items-center justify-center realtime-div text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9472 14.4612C14.6244 14.8306 14.4629 15.0153 14.2819 15.1777C14.121 15.3219 13.9487 15.4529 13.7667 15.5693C13.5618 15.7004 13.3384 15.8077 12.8914 16.0223C11.8174 16.538 11.2804 16.7959 10.9271 16.705C10.6205 16.626 10.3693 16.4065 10.25 16.1132C10.1126 15.7753 10.2963 15.2086 10.6635 14.0752C10.8164 13.6035 10.8928 13.3677 10.9952 13.1471C11.0863 12.9511 11.193 12.7629 11.3144 12.5842C11.4511 12.383 11.6125 12.1983 11.9354 11.8289L17.0023 6.03138C17.076 5.94704 17.1129 5.90487 17.1574 5.88701C17.1966 5.87129 17.2398 5.86839 17.2807 5.87871C17.3273 5.89045 17.3695 5.92731 17.4538 6.00102L19.9838 8.21213C20.0681 8.28584 20.1103 8.3227 20.1281 8.36727C20.1438 8.40647 20.1467 8.44964 20.1364 8.4906C20.1247 8.53715 20.0878 8.57932 20.0141 8.66366L14.9472 14.4612Z" fill="currentColor"></path><path d="M20.8883 7.65066C20.8146 7.73499 20.7778 7.77716 20.7332 7.79503C20.694 7.81075 20.6508 7.81365 20.6099 7.80333C20.5633 7.79159 20.5211 7.75473 20.4368 7.68102L17.9096 5.47231C17.8253 5.3986 17.7831 5.36175 17.7652 5.31718C17.7495 5.27798 17.7466 5.23481 17.7569 5.19385C17.7687 5.14729 17.8055 5.10512 17.8792 5.02079L18.3305 4.50446C18.6354 4.15563 18.7878 3.98121 18.9511 3.87147C19.3968 3.57199 19.9685 3.53354 20.4502 3.77066C20.6267 3.85755 20.8012 4.00999 21.15 4.31486C21.4988 4.61972 21.6732 4.77216 21.783 4.93546C22.0824 5.3811 22.1209 5.95283 21.8838 6.43456C21.7969 6.61108 21.6444 6.7855 21.3396 7.13432L20.8883 7.65066Z" fill="currentColor"></path><path d="M9.5 18C9.5 18 7.2314 20.6818 6 20C4.7686 19.3182 8.43957 14.8136 8.43957 13.0357C8.43957 12.0802 5.54026 16.2053 3.75331 16.7185C0.87539 17.5452 7.17108 5 7.17108 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="dark-text text-[0.9rem] font-semibold">Realtime</h4>
                  </div>
                  <p className="text-gray-600 dark-text text-[0.8rem] max-w-[15rem]">Generate images with custom styles in Flux and Videogram.</p>
                </div>
              </div>
              <button className="text-[0.7rem] rounded-xl bg-gray-100 gray-bg dark-text px-4 py-1 font-medium">Open</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-[42px] h-[42px] rounded-lg flex items-center justify-center enhancer-div text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.49935 13.0083C4.34395 13.5194 3.94455 13.9195 3.43425 14.075C3.94455 14.2306 4.34395 14.6306 4.49935 15.1417C4.65465 14.6306 5.05405 14.2306 5.56445 14.075C5.05405 13.9195 4.65465 13.5194 4.49935 13.0083Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.3704 5.57373C16.215 6.08483 15.8156 6.48493 15.3053 6.64043C15.8156 6.79603 16.215 7.19603 16.3704 7.70713C16.5257 7.19603 16.9251 6.79603 17.4355 6.64043C16.9251 6.48493 16.5257 6.08483 16.3704 5.57373Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.82105 18.4485H7.83105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.8125 3.69873H12.8025" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><rect x="3.3868" y="5.14091" width="2.5" height="22.0199" rx="1.25" transform="rotate(-44.5361 3.3868 5.14091)" stroke="currentColor" strokeWidth="1.5"></rect><path d="M8.4043 11.3093L11.2555 8.50389L20.2713 17.6668C21.046 18.4542 21.0357 19.7204 20.2484 20.4951C19.461 21.2698 18.1947 21.2596 17.42 20.4722L8.4043 11.3093Z" fill="currentColor"></path></svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="dark-text text-[0.9rem] font-semibold">Enhancer</h4>
                    <div className="bg-[#0D65FD] px-[5px] rounded-lg text-white font-semibold text-[0.7rem]"><span>New</span></div>
                  </div>
                  <p className="text-gray-600 dark-text text-[0.8rem] max-w-[15rem]">Generate images with custom styles in Flux and Videogram.</p>
                </div>
              </div>
              <button className="text-[0.7rem] rounded-xl bg-gray-100 gray-bg dark-text px-4 py-1 font-medium">Open</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-[42px] h-[42px] edit-div rounded-lg flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.854L12 5.51603" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><circle cx="12.0001" cy="8.17831" r="2.12118" stroke="currentColor" strokeWidth="1.5"></circle><path d="M10.4869 10.1001L7.45996 21.4302" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><path d="M17.2646 21.2366C17.3715 21.6368 17.1338 22.0479 16.7336 22.1548C16.3334 22.2617 15.9224 22.0239 15.8155 21.6238L17.2646 21.2366ZM14.2377 9.90652L17.2646 21.2366L15.8155 21.6238L12.7885 10.2937L14.2377 9.90652Z" fill="currentColor"></path><path d="M6.42188 16.1118C6.42188 16.1118 7.91228 17.3606 12.0006 17.3606C16.0889 17.3606 17.5793 16.1118 17.5793 16.1118" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="dark-text text-[0.9rem] font-semibold">Edit</h4>
                    <div className="bg-[#0D65FD] px-[5px] rounded-lg text-white font-semibold text-[0.7rem]"><span>New</span></div>
                  </div>
                  <p className="text-gray-600 dark-text text-[0.8rem] max-w-[15rem]">Generate images with custom styles in Flux and Videogram.</p>
                </div>
              </div>
              <button className="text-[0.7rem] rounded-xl bg-gray-100 gray-bg dark-text px-4 py-1 font-medium">Open</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-[42px] h-[42px] video-lipsync rounded-lg flex items-center justify-center text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4998 21.174C15.4998 20.5 14.3718 20 12.9998 20C10.9418 20 9.07179 22.356 6.99979 22C4.92779 21.644 4.22479 18.631 5.49979 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.165 8.40356C10.7043 10.6535 12.5111 12.4106 14.7882 12.8777L6.83049 18.7674C6.60581 18.9339 6.32644 19.0157 6.04426 18.9976C5.76209 18.9795 5.49628 18.8627 5.2962 18.6689L4.34224 17.7427C4.14504 17.5516 4.02487 17.2984 4.00345 17.0288C3.98204 16.7593 4.06079 16.4912 4.22547 16.2731L10.165 8.40356Z" fill="currentColor"></path><circle cx="16.5" cy="6.5" r="5.5" fill="currentColor"></circle></svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="dark-text text-[0.9rem] font-semibold">Video Lipsync</h4>
                    <div className="bg-[#0D65FD] px-[5px] rounded-lg text-white font-semibold text-[0.7rem]"><span>New</span></div>
                  </div>
                  <p className="text-gray-600 dark-text text-[0.8rem] max-w-[15rem]">Generate images with custom styles in Flux and Videogram.</p>
                </div>
              </div>
              <button className="text-[0.7rem] rounded-xl bg-gray-100 gray-bg dark-text px-4 py-1 font-medium">Open</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-[42px] h-[42px] bg-[#141618] rounded-lg flex items-center justify-center text-white">
                  <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.6904 14.625C24.4364 14.625 25.1517 14.3287 25.6792 13.8012C26.2066 13.2738 26.5029 12.5584 26.5029 11.8125C26.5029 11.0666 26.2066 10.3512 25.6792 9.82376C25.1517 9.29632 24.4364 9 23.6904 9C22.9445 9 22.2291 9.29632 21.7017 9.82376C21.1742 10.3512 20.8779 11.0666 20.8779 11.8125C20.8779 12.5584 21.1742 13.2738 21.7017 13.8012C22.2291 14.3287 22.9445 14.625 23.6904 14.625Z" fill="currentColor"></path><path d="M19.8084 21.5699L18.2221 37.4156C18.1717 37.7942 18.2737 38.1775 18.5058 38.4809C18.7378 38.7844 19.081 38.9832 19.4596 39.0337C19.8383 39.0842 20.2215 38.9821 20.525 38.7501C20.8285 38.518 21.0273 38.1749 21.0778 37.7962L22.5965 28.6743C22.6383 28.4147 22.7712 28.1785 22.9713 28.008C23.1715 27.8375 23.4258 27.7439 23.6887 27.7439C23.9516 27.7439 24.2059 27.8375 24.4061 28.008C24.6062 28.1785 24.7391 28.4147 24.7809 28.6743L26.2996 37.7962C26.3501 38.1749 26.549 38.518 26.8524 38.7501C27.1559 38.9821 27.5391 39.0842 27.9178 39.0337C28.2964 38.9832 28.6396 38.7844 28.8716 38.4809C29.1037 38.1775 29.2057 37.7942 29.1553 37.4156L27.5709 21.5699C27.5307 21.1575 27.5821 20.7413 27.7215 20.351C27.8608 19.9607 28.0847 19.6061 28.3771 19.3124L33.0646 13.2824C33.296 12.9729 33.3982 12.5856 33.3499 12.2022C33.3015 11.8188 33.1063 11.4691 32.8053 11.2267C32.5044 10.9843 32.1211 10.868 31.7362 10.9024C31.3513 10.9369 30.9947 11.1192 30.7415 11.4112L26.7534 16.1999C26.5951 16.4046 26.3798 16.5579 26.1346 16.6406C25.7034 16.7793 24.8878 16.9706 23.6896 16.9706C22.4896 16.9706 21.6759 16.7793 21.2428 16.6406C20.9983 16.5576 20.7837 16.4043 20.6259 16.1999L16.6378 11.4112C16.387 11.1111 16.0285 10.9214 15.6393 10.883C15.2501 10.8445 14.8614 10.9603 14.5567 11.2055C14.2521 11.4507 14.0558 11.8057 14.0102 12.1941C13.9646 12.5825 14.0732 12.9733 14.3128 13.2824L19.0003 19.3124C19.5946 19.9049 19.8928 20.7337 19.8084 21.5699Z" fill="currentColor"></path></svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="dark-text text-[0.9rem] font-semibold">Motion Transfer</h4>
                    <div className="bg-[#0D65FD] px-[5px] rounded-lg text-white font-semibold text-[0.7rem]"><span>New</span></div>
                  </div>
                  <p className="text-gray-600 dark-text text-[0.8rem] max-w-[15rem]">Generate images with custom styles in Flux and Videogram.</p>
                </div>
              </div>
              <button className="text-[0.7rem] rounded-xl bg-gray-100 gray-bg dark-text px-4 py-1 font-medium">Open</button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center dark-text">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="circleMask"><circle cx="12" cy="12" r="7"></circle></clipPath><linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="white" stopOpacity="0.6"></stop><stop offset="75%" stopColor="white" stopOpacity="0.15"></stop><stop offset="100%" stopColor="white" stopOpacity="0"></stop></linearGradient></defs><image href="https://www.krea.ai/train-icon-photo.webp" x="5" y="5" width="14" height="14" clipPath="url(#circleMask)"></image><circle cx="12" cy="12" r="6" fill="url(#fadeGradient)"></circle><path d="M16.625 20.1226C14.6815 21.2446 12.3964 21.6219 10.1954 21.1841C7.99441 20.7463 6.02762 19.5232 4.66148 17.7429C3.29534 15.9625 2.62303 13.7462 2.7698 11.5068C2.91658 9.26752 3.87243 7.15792 5.45926 5.57108" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><path d="M20.0107 7.48682C21.0289 9.25025 21.4366 11.3004 21.1709 13.3192C20.9051 15.338 19.9806 17.2127 18.5407 18.6526" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><path d="M12 2.86182C13.2147 2.86182 14.4176 3.10107 15.5398 3.56593C16.6621 4.03079 17.6818 4.71214 18.5407 5.57108" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><path d="M7.375 4.10108C8.07507 3.6969 8.8251 3.38622 9.60592 3.177" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="dark-text text-[0.9rem] font-semibold">Train</h4>
                  </div>
                  <p className="text-gray-600 dark-text text-[0.8rem] max-w-[15rem]">Generate images with custom styles in Flux and Videogram.</p>
                </div>
              </div>
              <button className="text-[0.7rem] rounded-xl bg-gray-100 gray-bg dark-text px-4 py-1 font-medium">Open</button>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}