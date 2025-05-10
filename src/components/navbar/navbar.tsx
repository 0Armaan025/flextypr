import Image from "next/image";
import { Inter } from "next/font/google";

import LOGO from "../../../public/logo_new.png";

const interFont = Inter({
    subsets: ["latin"],
});

export const Navbar = () => {
    return (
        <nav className="nav flex flex-row justify-between items-center p-2 mx-8">
            <div className="branding-or-whatever">
                {/* hm this didn't load */}

                <Image src={LOGO} alt="logo" width={120} height={80} className="" /> {/* this should work*/}

            </div>

            <div className={`${interFont.className} flex flex-row gap-4 items-center`}>
                <h2 >About</h2>
                <input type="button" value="Create a room" className="bg-blue-800 cursor-pointer hover:bg-blue-700 transition-all duration-300 text-white px-2 py-2 rounded-lg w-32" />
            </div>
        </nav >
    );
}