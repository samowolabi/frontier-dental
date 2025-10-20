import { useState } from "react";
import ProductGrid from "../products/ProductGrid";
import SearchBar from "../products/SearchBar";
import { CartIcon, SearchIcon, UserIcon, HeartIcon, MenuIcon } from "../shared/Icons";

export default function Header() {

    const [isSearchVisible, setIsSearchVisible] = useState(false);

    return (
        <>
            <SearchBar isVisible={isSearchVisible} setIsVisible={setIsSearchVisible} />

            <nav className="w-full max-w-[86rem] mx-auto grid grid-cols-3 items-center p-4">
                <span className="cursor-pointer lg:hidden">
                    <MenuIcon width={26} height={26} />
                </span>
                <ul className="hidden lg:flex items-center gap-8 font-medium">
                    <li>Categories</li>
                    <li>Manufacturers</li>
                    <li>What's New</li>
                </ul>

                <div className="flex justify-center">
                    <img src="/logo/frontier-logo.png" alt="Frontier Dental Logo" width={160} height={50} />
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