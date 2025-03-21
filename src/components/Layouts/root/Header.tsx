"use client";

import React, { useState } from "react";
import Bangla from "@/Data/Img/BanglaLag.svg";
import English from "@/Data/Img/EnglishLag.svg";
import Image from "next/image";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
    const [selectedLang, setSelectedLang] = useState("English");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const handleLanguageChange = (lang: string) => {
        setSelectedLang(lang);
        setIsDropdownOpen(false);
    };

    return (
        <div className="w-full">
            {/* Top-Box */}
            <div className="w-full h-[40px] bg-secondary text-white mx-auto px-4 lg:px-6 flex justify-between items-center">
                <p>Get Ready For Summer Offers</p>
                <p>Use code '2025' and get 10% Off</p>

                <div 
                    className="relative flex items-center gap-2 cursor-pointer"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <Image alt="" src={selectedLang === "Bangla" ? Bangla : English} width={20} height={20} />
                    <p className="uppercase">{selectedLang}</p>
                    {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
                    
                    {isDropdownOpen && (
                        
                        <div className="absolute left-0 top-2 bg-transparent text-black shadow-lg rounded-md w-[100px] py-2 transition-opacity duration-300 ease-in-out">
                            <div className="top-8 bg-white">
                            <p 
                                className="px-4 py-1 hover:bg-gray-200 uppercase"
                                onClick={() => handleLanguageChange("English")}
                            >
                                English
                            </p>
                            <p 
                                className="px-4 py-1 hover:bg-gray-200 uppercase"
                                onClick={() => handleLanguageChange("Bangla")}
                            >
                                Bangla
                            </p>
                        </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;