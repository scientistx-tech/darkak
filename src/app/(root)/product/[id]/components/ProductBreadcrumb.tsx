"use client";

import SocialShare from "@/components/ShareSocialMedia";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiGitCompare } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";

const ProductBreadcrumb = ({ title, url }: { title: string; url: string }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  console.log(title, url);

  const baseUrl = "https://www.darkak.com.bd";

  return (
    <div>
      <div className="mt-2 flex items-center justify-between py-3">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1 text-sm text-[#4B4E55]">
          <Link href="/" className="hover:text-primaryDarkBlue">
            Home
          </Link>
          {segments.map((seg, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/");
            const isLast = idx === segments.length - 1;

            return (
              <span key={idx} className="flex items-center space-x-1">
                <span>/</span>
                {isLast ? (
                  <span className="text-secondaryBlue">
                    {decodeURIComponent(seg)}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize hover:text-primaryDarkBlue"
                  >
                    {decodeURIComponent(seg)}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* <ShareDropdown productName="Striking Tag Heuer Carrera Chronograph Blue Dial Stainless Steel" /> */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CiShare2 className="h-4 w-4 text-primaryDarkBlue" />
              <p>Share:</p>
            </div>
            <SocialShare url={`${baseUrl}${url}`} title={title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;
