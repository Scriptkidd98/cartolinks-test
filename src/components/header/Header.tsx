"use client"

import React, { useState, useRef, useEffect, useContext } from "react";
import { DarkModeContext } from "../DarkModeProvider";
import { Menu } from "aria-ease";
import { ChevronDown, ChevronUp, HeadphonesIcon, BellIcon, SunIcon, MoonIcon } from "lucide-react";


const Header = () => {
    const accessibleMenu = useRef<ReturnType<typeof Menu.makeMenuAccessible>>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const[showMenu, setShowMenu] = useState<boolean>(false);

    useEffect(() => {
        accessibleMenu.current = Menu.makeMenuAccessible({
        menuId: "profile-menu",
        menuElementsClass: "profile-menu-item",
        triggerId: "profile-menu-button"
        });
    }, [])

    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                if (accessibleMenu.current) {
                    accessibleMenu.current.closeMenu();
                }
                setShowMenu(false);
            }
        }
        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    const toggleMenuDisplay = () => {
        const menuDiv = document.querySelector("#profile-menu") as HTMLElement;
        if (accessibleMenu.current) {
            if (getComputedStyle(menuDiv).display === "none") {
                accessibleMenu.current.openMenu();
                setShowMenu(true);
            } else {
                accessibleMenu.current.closeMenu();
                setShowMenu(false);
            }
        } 
    };

    useEffect(() => {
        const handleGlobalKeyDown = (event: { key: string; }) => {
            if(event.key === 'Escape') {
                if(showMenu) {
                    setShowMenu(false);
                }
            }
        }

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [showMenu])

  return (
    <div className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center gap-3">
            <a className="dark-text block-interactive rounded-lg" href="#">
                <svg aria-label="Krea Logo" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8.34 1.266c1.766-.124 3.324 1.105 3.551 2.802.216 1.612-.887 3.171-2.545 3.536-.415.092-.877.066-1.317.122a4.63 4.63 0 0 0-2.748 1.34l-.008.004-.01-.001-.006-.005-.003-.009q0-.009.005-.016a.04.04 0 0 0 .007-.022 438 438 0 0 1-.01-4.541c.003-1.68 1.33-3.086 3.085-3.21"></path><path d="M8.526 15.305c-2.247-.018-3.858-2.23-3.076-4.3a3.31 3.31 0 0 1 2.757-2.11c.384-.04.845-.03 1.215-.098 1.9-.353 3.368-1.806 3.665-3.657.066-.41.031-.9.128-1.335.449-2.016 2.759-3.147 4.699-2.236 1.011.476 1.69 1.374 1.857 2.447q.051.33.034.818c-.22 5.842-5.21 10.519-11.279 10.47m2.831.93a.04.04 0 0 1-.021-.02l-.001-.006.002-.006q0-.003.003-.004l.006-.003q3.458-.792 5.992-3.185.045-.042.083.007c.27.357.554.74.78 1.106a10.6 10.6 0 0 1 1.585 4.89q.037.53.023.819c-.084 1.705-1.51 3.08-3.31 3.09-1.592.01-2.992-1.077-3.294-2.597-.072-.36-.05-.858-.11-1.238q-.282-1.755-1.715-2.84zm-3.369 6.64c-1.353-.235-2.441-1.286-2.684-2.593a5 5 0 0 1-.05-.817V15.14q0-.021.016-.007c.884.786 1.814 1.266 3.028 1.346l.326.01c1.581.051 2.92 1.087 3.229 2.592.457 2.225-1.557 4.195-3.865 3.793"></path></svg>
            </a>
            <div className="relative" ref={menuRef}>
                <button 
                    id="profile-menu-button" 
                    className="px-3 py-1 rounded-lg block-interactive" 
                    onClick={toggleMenuDisplay}
                    aria-haspopup={true}
                    aria-expanded={false}
                    aria-controls="profile-menu"
                >
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-500"></div>
                        <span className="text-[0.9rem] text-gray-700 dark-text">benevolenttinkerbell</span>
                        {showMenu ? <ChevronUp height={15} width={15} className="text-gray-700 dark-text"/> : <ChevronDown height={15} width={15} className="text-gray-700 dark-text"/>}
                    </div>
                </button>
                
                <div className="absolute right-0 mt-2 w-full rounded-lg shadow-lg z-1000 bg-white black-bg" id="profile-menu" role="menu" aria-labelledby="profile-menu-button" style={{display: "none", marginTop: "5px"}}>
                    <ul className="p-2">
                      <li className="w-full">
                        <button className="profile-menu-item text-[0.8rem] text-gray-700 p-2 rounded-lg w-full flex items-center justify-center dark-text">Profile</button>
                      </li>
                      <li className="w-full">
                        <button className="profile-menu-item text-[0.8rem] text-gray-700 p-2 rounded-lg w-full flex items-center justify-center dark-text">Settings</button>
                      </li>
                      <li className="w-full">
                        <button className="profile-menu-item text-[0.8rem] text-gray-700 p-2 rounded-lg w-full flex items-center justify-center dark-text">Logout</button>
                      </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="hidden md:flex items-center bg-gray-100 gray-bg rounded-xl p-1 gap-2">
            <button className="rounded-xl px-3 py-2 flex items-center justify-center block-interactive bg-white" aria-label="Home">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 11.7354C2 10.4141 2 9.75338 2.18958 9.15972C2.35736 8.63437 2.63195 8.14939 2.99611 7.73524C3.40763 7.26724 3.97416 6.92732 5.10723 6.24748L8.70722 4.08748C9.90443 3.36916 10.503 3.01 11.142 2.86967C11.7073 2.74555 12.2927 2.74555 12.858 2.86967C13.497 3.01 14.0956 3.36916 15.2928 4.08748L18.8928 6.24748C20.0258 6.92732 20.5924 7.26724 21.0039 7.73524C21.3681 8.14939 21.6426 8.63437 21.8104 9.15972C22 9.75338 22 10.4141 22 11.7354V18.9118C22 20.0319 22 20.592 21.782 21.0198C21.5903 21.3961 21.2843 21.7021 20.908 21.8938C20.4802 22.1118 19.9201 22.1118 18.8 22.1118H18.2C17.0799 22.1118 16.5198 22.1118 16.092 21.8938C15.7157 21.7021 15.4097 21.3961 15.218 21.0198C15 20.592 15 20.0319 15 18.9118V15.7118C15 15.1518 15 14.8717 14.891 14.6578C14.7951 14.4697 14.6422 14.3167 14.454 14.2208C14.2401 14.1118 13.9601 14.1118 13.4 14.1118H10.6C10.0399 14.1118 9.75992 14.1118 9.54601 14.2208C9.35785 14.3167 9.20487 14.4697 9.10899 14.6578C9 14.8717 9 15.1518 9 15.7118V18.9118C9 20.0319 9 20.592 8.78201 21.0198C8.59027 21.3961 8.28431 21.7021 7.90798 21.8938C7.48016 22.1118 6.9201 22.1118 5.8 22.1118H5.2C4.0799 22.1118 3.51984 22.1118 3.09202 21.8938C2.71569 21.7021 2.40973 21.3961 2.21799 21.0198C2 20.592 2 20.0319 2 18.9118V11.7354Z" fill="currentColor"></path></svg>
            </button>
            <button className="rounded-xl px-3 py-2 flex items-center justify-center block-interactive dark-text" aria-label="Image">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.4763 9.85043C10.4763 10.8104 9.69763 11.589 8.73768 11.589C7.77772 11.589 7 10.8104 7 9.85043C7 8.89049 7.77772 8.11182 8.73768 8.11182C9.69763 8.11182 10.4754 8.88955 10.4763 9.84856V9.85043Z" fill="currentColor"></path><rect x="2.75" y="3.86182" width="18.5" height="16.5" rx="3.25" stroke="currentColor" strokeWidth="1.5"></rect><path d="M15.758 13.1118C17.5271 13.1118 19.1544 14.6938 20 15.4766V19.1118H4C4 19.1118 5.29914 17.0464 6.6586 16.0349C8.01806 15.0235 9.56678 16.6015 11.2673 16.6015C12.9687 16.6015 13.9898 13.1118 15.758 13.1118Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
            <button className="rounded-xl px-3 py-2 flex items-center justify-center block-interactive dark-text" aria-label="Video">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22.263 7.17399C21.637 6.41199 20.506 6.30099 19.743 6.92499L18.5167 7.92894C18.2593 8.13966 18.1409 8.46318 18.1571 8.79542C18.1589 8.83351 18.16 8.872 18.16 8.91099V15.312C18.16 15.3533 18.1588 15.3941 18.1568 15.4344C18.14 15.7656 18.2584 16.0881 18.5146 16.2987L19.729 17.297C20.045 17.558 20.448 17.701 20.863 17.701C21.849 17.701 22.654 16.899 22.657 15.912L22.669 8.31399C22.67 7.89899 22.527 7.49299 22.263 7.17399Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M12.6444 5.11182H5.68203C3.08003 5.11182 1.33203 6.93982 1.33203 9.66182V15.0618C1.33203 17.7838 3.08003 19.6118 5.68203 19.6118H12.6434C15.2474 19.6118 16.9964 17.7838 16.9964 15.0618V9.66182C16.9964 6.93982 15.2474 5.11182 12.6444 5.11182Z" fill="currentColor"></path><rect x="1" y="5.11182" width="16" height="15" rx="4" fill="currentColor"></rect></svg>
            </button>
            <button className="rounded-xl px-3 py-2 flex items-center justify-center block-interactive dark-text" aria-label="Enhancer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.49935 13.0083C4.34395 13.5194 3.94455 13.9195 3.43425 14.075C3.94455 14.2306 4.34395 14.6306 4.49935 15.1417C4.65465 14.6306 5.05405 14.2306 5.56445 14.075C5.05405 13.9195 4.65465 13.5194 4.49935 13.0083Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.3704 5.57373C16.215 6.08483 15.8156 6.48493 15.3053 6.64043C15.8156 6.79603 16.215 7.19603 16.3704 7.70713C16.5257 7.19603 16.9251 6.79603 17.4355 6.64043C16.9251 6.48493 16.5257 6.08483 16.3704 5.57373Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.82105 18.4485H7.83105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.8125 3.69873H12.8025" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><rect x="3.3868" y="5.14091" width="2.5" height="22.0199" rx="1.25" transform="rotate(-44.5361 3.3868 5.14091)" stroke="currentColor" strokeWidth="1.5"></rect><path d="M8.4043 11.3093L11.2555 8.50389L20.2713 17.6668C21.046 18.4542 21.0357 19.7204 20.2484 20.4951C19.461 21.2698 18.1947 21.2596 17.42 20.4722L8.4043 11.3093Z" fill="currentColor"></path></svg>
            </button>
            <button className="rounded-xl px-3 py-2 flex items-center justify-center block-interactive dark-text" aria-label="Pencil">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9472 14.4612C14.6244 14.8306 14.4629 15.0153 14.2819 15.1777C14.121 15.3219 13.9487 15.4529 13.7667 15.5693C13.5618 15.7004 13.3384 15.8077 12.8914 16.0223C11.8174 16.538 11.2804 16.7959 10.9271 16.705C10.6205 16.626 10.3693 16.4065 10.25 16.1132C10.1126 15.7753 10.2963 15.2086 10.6635 14.0752C10.8164 13.6035 10.8928 13.3677 10.9952 13.1471C11.0863 12.9511 11.193 12.7629 11.3144 12.5842C11.4511 12.383 11.6125 12.1983 11.9354 11.8289L17.0023 6.03138C17.076 5.94704 17.1129 5.90487 17.1574 5.88701C17.1966 5.87129 17.2398 5.86839 17.2807 5.87871C17.3273 5.89045 17.3695 5.92731 17.4538 6.00102L19.9838 8.21213C20.0681 8.28584 20.1103 8.3227 20.1281 8.36727C20.1438 8.40647 20.1467 8.44964 20.1364 8.4906C20.1247 8.53715 20.0878 8.57932 20.0141 8.66366L14.9472 14.4612Z" fill="currentColor"></path><path d="M20.8883 7.65066C20.8146 7.73499 20.7778 7.77716 20.7332 7.79503C20.694 7.81075 20.6508 7.81365 20.6099 7.80333C20.5633 7.79159 20.5211 7.75473 20.4368 7.68102L17.9096 5.47231C17.8253 5.3986 17.7831 5.36175 17.7652 5.31718C17.7495 5.27798 17.7466 5.23481 17.7569 5.19385C17.7687 5.14729 17.8055 5.10512 17.8792 5.02079L18.3305 4.50446C18.6354 4.15563 18.7878 3.98121 18.9511 3.87147C19.3968 3.57199 19.9685 3.53354 20.4502 3.77066C20.6267 3.85755 20.8012 4.00999 21.15 4.31486C21.4988 4.61972 21.6732 4.77216 21.783 4.93546C22.0824 5.3811 22.1209 5.95283 21.8838 6.43456C21.7969 6.61108 21.6444 6.7855 21.3396 7.13432L20.8883 7.65066Z" fill="currentColor"></path><path d="M9.5 18C9.5 18 7.2314 20.6818 6 20C4.7686 19.3182 8.43957 14.8136 8.43957 13.0357C8.43957 12.0802 5.54026 16.2053 3.75331 16.7185C0.87539 17.5452 7.17108 5 7.17108 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
            <button className="rounded-xl px-3 py-2 flex items-center justify-center block-interactive dark-text" aria-label="Compass">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.854L12 5.51603" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><circle cx="12.0001" cy="8.17831" r="2.12118" stroke="currentColor" strokeWidth="1.5"></circle><path d="M10.4869 10.1001L7.45996 21.4302" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><path d="M17.2646 21.2366C17.3715 21.6368 17.1338 22.0479 16.7336 22.1548C16.3334 22.2617 15.9224 22.0239 15.8155 21.6238L17.2646 21.2366ZM14.2377 9.90652L17.2646 21.2366L15.8155 21.6238L12.7885 10.2937L14.2377 9.90652Z" fill="currentColor"></path><path d="M6.42188 16.1118C6.42188 16.1118 7.91228 17.3606 12.0006 17.3606C16.0889 17.3606 17.5793 16.1118 17.5793 16.1118" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
            </button>
            <button className="rounded-xl px-3 py-2 flex items-center justify-center block-interactive dark-text" aria-label="File">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 5C3 4.45 3.45 4 4 4H9.17C9.58 4 9.95 4.21 10.14 4.55L10.86 5.89C11.05 6.23 11.42 6.44 11.83 6.44H20C20.55 6.44 21 6.89 21 7.44V11C21 11.55 20.55 12 20 12H4C3.45 12 3 11.55 3 11V5Z"></path><rect x="3" y="7" width="18" height="12" rx="1"></rect><path d="M3.15 18.5C3.08 18.15 3.08 17.65 3.08 17H20.92C20.92 17.65 20.92 18.15 20.85 18.5H3.15Z" opacity="0.3"></path><path d="M5 20H19C19.8 20 20.2 20 20.5 19.8C20.7 19.7 20.9 19.5 21 19.2C21.05 19.1 21.08 19 21.1 18.5H2.9C2.92 19 2.95 19.1 3 19.2C3.1 19.5 3.3 19.7 3.5 19.8C3.8 20 4.2 20 5 20Z" opacity="0.5"></path></svg>
            </button>
        </div>
        <div className="flex items-center gap-2">
            <button className="hidden lg:flex items-center gap-1 py-[6px] px-2 rounded-lg bg-gray-100 gray-bg block-interactive dark-text">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.4763 9.85043C10.4763 10.8104 9.69763 11.589 8.73768 11.589C7.77772 11.589 7 10.8104 7 9.85043C7 8.89049 7.77772 8.11182 8.73768 8.11182C9.69763 8.11182 10.4754 8.88955 10.4763 9.84856V9.85043Z" fill="currentColor"></path><rect x="2.75" y="3.86182" width="18.5" height="16.5" rx="3.25" stroke="currentColor" strokeWidth="1.5"></rect><path d="M15.758 13.1118C17.5271 13.1118 19.1544 14.6938 20 15.4766V19.1118H4C4 19.1118 5.29914 17.0464 6.6586 16.0349C8.01806 15.0235 9.56678 16.6015 11.2673 16.6015C12.9687 16.6015 13.9898 13.1118 15.758 13.1118Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <span className="text-[0.7rem] text-gray-700 font-medium dark-text">Gallery</span>
            </button>
            <button className="hidden lg:flex items-center gap-1 py-[6px] px-2 rounded-lg bg-gray-100 gray-bg block-interactive">
                <HeadphonesIcon height={15} width={15} className="text-gray-700 dark-text"/>
                <span className="text-[0.7rem] text-gray-700 font-medium dark-text">Support</span>
            </button>
            <button className="flex items-center gap-1 py-[6.9px] px-2 rounded-lg bg-gray-100 gray-bg block-interactive" aria-label="Notification">
                <BellIcon height={15} width={15} className="text-gray-700 dark-text"/>
            </button>
            <button
                className="flex items-center gap-1 py-[6.9px] px-2 rounded-lg bg-gray-100 gray-bg block-interactive"
                aria-label="Dark mode toggle"
                onClick={toggleDarkMode}
            >
                {darkMode ? (
                    <MoonIcon height={15} width={15} className="dark-text"/>
                ) : (
                    <SunIcon height={15} width={15} className="text-gray-700"/>
                )}
            </button>
            <button className="h-6 w-6 rounded-full bg-purple-500 block-interactive hidden md:flex items-center justify-center" aria-label="User profile"></button>
        </div>
    </div>
  )
}

export default Header