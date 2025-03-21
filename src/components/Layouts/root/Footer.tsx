import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="w-full">
      <div className="h-[500px] w-full bg-secondary">
        <div>
          <p>Get 10% Discount on first LOGIN</p>

          <Link href="/">Register now</Link>

          <p>Stay Connected</p>

          <div>icon</div>
        </div>

        <div>
          <p>Quick Links</p>

          <Link href="/">Home</Link>
          <Link href="/">Product</Link>
          <Link href="/">Blogs</Link>
          <Link href="/">Contact Us</Link>
        </div>

        <div>
          <p>Product Categories</p>

          <Link href="/">Categories-1</Link>
          <Link href="/">Categories-2</Link>
          <Link href="/">Categories-3</Link>
          <Link href="/">Categories-4</Link>
          <Link href="/">Categories-5</Link>
        </div>

        <div>
          <p>DARKAK</p>

          <p>Hello! asda asdasd adsdasdas sadas asdasd asdas dasd as</p>

          <p>Contact</p>

          <p>Email: info@darkak.com.bd </p>
          <p>Phone: 01915665089</p>
          <p>Address: Upashahar , Bogura -5800</p>
        </div>
      </div>

      <div className="flex h-[50px] w-full items-center justify-center bg-[#D9D9D9]">
        <p className="">
          &copy; {new Date().getFullYear()} - DARKAK, All rights are reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
