"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileImg from "@/Data/Img/profile.jpg";
import ContuctUs from "@/Data/Img/Contact us.png";

const WHATSAPP_LINK =
  "https://api.whatsapp.com/send?phone=8801711726501&text=hello%F0%9F%98%87";

export default function FloatButton() {
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const hideTime = localStorage.getItem("hideBubbleTime");
    if (hideTime) {
      const diff = Date.now() - parseInt(hideTime);
      if (diff < 30 * 60 * 1000) {
        setShowBubble(false);
        const timeout = setTimeout(
          () => {
            setShowBubble(true);
            localStorage.removeItem("hideBubbleTime");
          },
          30 * 60 * 1000 - diff,
        );

        return () => clearTimeout(timeout);
      }
    }
  }, []);

  const handleHide = () => {
    setShowBubble(false);
    localStorage.setItem("hideBubbleTime", Date.now().toString());
  };

  return (
    <div className="fixed bottom-8 right-4 z-50">
      <div className="relative flex items-end space-x-2">
        {/* Chat bubble */}
        {showBubble && (
          <div className="relative max-w-[220px] rounded-xl bg-white px-3 py-2 text-sm text-black shadow-lg">
            <button
              className="absolute -left-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-xs text-black hover:bg-gray-300"
              onClick={handleHide}
            >
              -
            </button>
            সার, কিভাবে সহযোগিতা করতে পারি?
          </div>
        )}

        {/* Profile image with blinking dot */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border-2 border-primary shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="relative">
            <Image
              src={ProfileImg}
              alt="Support Agent"
              width={50}
              height={50}
              className="h-[35px] w-[35px] rounded-full border-2 border-white shadow-md md:h-[50px] md:w-[50px]"
            />
            <span className="absolute right-0 top-0 h-3 w-3 animate-ping rounded-full border-2 border-white bg-green-500"></span>
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
          </div>
        </a>
      </div>
    </div>
  );
}
