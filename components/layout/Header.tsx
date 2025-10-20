import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../products/SearchBar";
import { CartIcon, SearchIcon, HeartIcon, MenuIcon, CloseIcon } from "../shared/Icons";

export default function Header() {
    const [menuItems] = useState([
        { name: "Home", path: "/" },
        { name: "Admin", path: "/admin/products" },
        { name: "Categories", path: "#" },
    ]);

    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(true);

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
                <span onClick={() => setIsMobileMenuVisible(true)} className="cursor-pointer lg:hidden">
                    <MenuIcon width={26} height={26} />
                </span>
                <ul className="hidden lg:flex items-center gap-8 font-medium">
                    {
                        menuItems.map((item) => (
                            <li key={item.name}>
                                {item.path === "#" ? (
                                    <span className="opacity-50">{item.name}</span>
                                ) : (
                                    <Link to={item.path} 
                                        className={`transition-colors duration-200 ${
                                            isActive(item.path) 
                                                ? "text-[#44a694] font-semibold" 
                                                : "text-gray-700 hover:text-[#44a694]"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        ))
                    }
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


            {/* Mobile Menu Full Height */}
            {isMobileMenuVisible && (
                <div className="fixed inset-0 bg-white z-50 flex flex-col">
                    
                    <div className="p-4 flex justify-between items-center">
                        <span className="font-bold text-lg"></span>
                        <button onClick={() => setIsMobileMenuVisible(false)} className="text-gray-700">
                            <CloseIcon width={24} height={24} />
                        </button>
                    </div>

                    <ul className="flex flex-col p-4 gap-6">
                        {
                            menuItems.map((item) => (
                                <li key={item.name}>
                                    {item.path === "#" ? (
                                        <span className="opacity-50">{item.name}</span>
                                    ) : (
                                        <Link to={item.path} 
                                            className={`block text-lg ${
                                                isActive(item.path) 
                                                    ? "text-[#44a694] font-semibold" 
                                                    : "text-gray-700 hover:text-[#44a694]"
                                            }`}
                                            onClick={() => setIsMobileMenuVisible(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}
        </>
    )
}