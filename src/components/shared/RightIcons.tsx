import React from 'react';
import { motion } from "framer-motion";
import { FaHeart, FaEye, FaRandom, FaShoppingCart } from "react-icons/fa";
import { FaFacebook, FaPinterest, FaXTwitter, FaLink } from "react-icons/fa6";
import Link from 'next/link';
import { Tooltip } from 'antd';

interface RightIconsProps {
    hovered: boolean;
    success: () => void;
}

export default function RightIcons({ hovered, success }: RightIconsProps) {
    return (
        <motion.div
            className="absolute right-3 top-5 z-30 flex flex-col gap-3 text-xl text-secondaryLiteBlue"
            initial={{ opacity: 0, y: -10 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
        >
            <Link href="/wishlist">
                <FaHeart className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primaryBlue" />
            </Link>
            <Link href="/product">
                <FaEye className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primaryBlue" />
            </Link>

            <Tooltip
            className=''
                placement="bottomRight"
                color="#5694FF"
                title={
                    <div className="flex gap-3 p-1 text-white">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook className="text-lg transition-transform hover:scale-125 hover:text-white" />
                        </a>
                        <a
                            href="https://pinterest.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaPinterest className="text-lg transition-transform hover:scale-125 hover:text-white" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaXTwitter className="text-lg transition-transform hover:scale-125 hover:text-white" />
                        </a>
                        <div
                            className="cursor-pointer text-lg transition-transform hover:scale-125 hover:text-white"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                success();
                            }}
                        >
                            <FaLink />
                        </div>
                    </div>
                }
            >
                <FaRandom className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primaryBlue" />
            </Tooltip>
        </motion.div>
    );
}
