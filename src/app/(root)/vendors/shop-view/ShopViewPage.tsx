import React from "react";
import { FaStar } from "react-icons/fa";

const shopData = {
  shopBanner:
    "https://img.freepik.com/free-vector/flat-local-market-business-social-media-cover-template_23-2149507335.jpg?semt=ais_hybrid&w=740",
  shopLogo:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLP0L-mu0JmaUEFQjNVlWbrxw3pgTZIBmFQg&s",
  shopName: "Darkak Sub Shop",
  shopRating: "4.8",
  shopReviews: "4",
  shopTotalProduct: "194",
  shopLink: "/vendors/shop-view",
  shopOrderCount: "120",
};
export default function ShopViewPage() {
  return (
    <div className="w-full px-12 py-6">
      <div className="w-full">
        {/* Banner Image */}
        <div className="relative h-[400px] w-full">
          <img
            src={shopData.shopBanner}
            alt="Vendor Banner"
            width={50}
            height={12}
            className="h-full w-full rounded-xl"
          />
          {/* Overlay for better text visibility */}
          <div className="absolute ml-[10px] mt-[-110px] flex h-[100px] items-center gap-5 rounded-xl bg-white px-6 text-black">
            <div className="">
              <img
                src={shopData.shopLogo}
                alt={`${shopData.shopName} Logo`}
                width={48}
                height={48}
                className="h-[70px] w-[70px] rounded-full border border-primaryBlue shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-primaryBlue">
                {shopData.shopName}
              </h2>
              <div className="flex items-center gap-1 text-xs text-yellow-500">
                <FaStar className="text-sm" />
                <span className="text-black">{shopData.shopRating}</span>
                <span className="ml-1 text-gray-500">Rating</span>
                <span className="ml-1 text-black">|</span>
                <span className="ml-1 text-black">{shopData.shopReviews}</span>
                <span className="ml-1 text-gray-500">Reviews</span>
              </div>

              <div className="flex items-center mt-1">
                <span className="ml-1 text-primary">Total Order:</span>
                <span className="ml-1 text-black">
                  {shopData.shopOrderCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
            {/* Orther products */}
        </div>

      </div>
    </div>
  );
}
