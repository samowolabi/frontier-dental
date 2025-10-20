import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../products/SearchBar";
import { CartIcon, SearchIcon, HeartIcon, MenuIcon } from "../shared/Icons";

export default function Header() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            <SearchBar isVisible={isSearchVisible} setIsVisible={setIsSearchVisible} />

            <nav className="w-full max-w-[86rem] mx-auto grid grid-cols-3 items-center p-4">
                <span className="cursor-pointer lg:hidden">
                    <MenuIcon width={26} height={26} />
                </span>
                <ul className="hidden lg:flex items-center gap-8 font-medium">
                    <li>
                        <Link to="/" 
                            className={`transition-colors duration-200 ${
                                isActive("/") 
                                    ? "text-[#44a694] font-semibold" 
                                    : "text-gray-700 hover:text-[#44a694]"
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products" 
                            className={`transition-colors duration-200 ${
                                isActive("/admin") 
                                    ? "text-[#44a694] font-semibold" 
                                    : "text-gray-700 hover:text-[#44a694]"
                            }`}
                        >
                            Admin
                        </Link>
                    </li>
                    <li className="opacity-50">Categories</li>
                </ul>

                <div className="flex justify-center">
                    <Link to="/">
                        <img src="/logo/frontier-logo.png" alt="Frontier Dental Logo" width={160} height={50} />
                    </Link>
                </div>

                <ul className="flex justify-end items-center gap-4 lg:gap-8">
                    <li onClick={() => setIsSearchVisible(true)} className="cursor-pointer"><SearchIcon width={22} height={22} /></li>
                    <li><CartIcon width={22} height={22} /></li>
                    <li><HeartIcon width={22} height={22} /></li>
                    {/* <li><UserIcon /></li> */}
                </ul>
            </nav>
        </>
    )
}