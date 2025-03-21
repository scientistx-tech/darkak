import React from "react";

function Footer() {
  return (
    <div className="w-full">
      <div className="h-[500px] w-full bg-secondary">footer</div>
      <div className="flex h-[50px] w-full items-center justify-center bg-[#D9D9D9]">
        <p className="">
          &copy; {new Date().getFullYear()} - DARKAK, All rights are reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
