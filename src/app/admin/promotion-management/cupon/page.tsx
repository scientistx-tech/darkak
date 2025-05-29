import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex items-center gap-x-1">
        <Image
          src="/images/icon/icon_cupon.png"
          alt="cupon_icon"
          width={20}
          height={20}
        />
        <p>Cupon</p>
      </div>
    </div>
  );
};

export default Page;
