"use client";
import { Product } from "@/app/(root)/types/ProductType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";

const PriceInfo: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();

  const hasDiscount = !!product?.discount && Number(product.discount) > 0;
  const price = Number(product?.price) || 0;
  const discount = Number(product?.discount) || 0;
  const discountType = product?.discount_type;
  let discountPrice = price;

  if (hasDiscount) {
    if (discountType === "flat") {
      discountPrice = price - discount;
    } else if (discountType === "percentage") {
      discountPrice = price - (price * discount) / 100;
    }
  }
  return (
    <div
      onClick={() => {
        router.push(`/product/${product.slug}`);
      }}
      className="group cursor-pointer"
    >
      <div className="flex flex-col justify-between space-y-2 p-2 text-center md:h-[150px] md:space-y-1 lg:space-y-2 xl:h-[200px] xl:space-y-0 xl:p-6 2xl:h-[170px]">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {hasDiscount && (
            <span className="text-sm font-semibold text-primaryBlue">
              Price {discountPrice} BDT
            </span>
          )}
          <span
            className={`text-sm text-gray-600 ${
              hasDiscount ? "line-through" : ""
            }`}
          >
            {price} BDT
          </span>
        </div>
        <h3 className="md:text-md line-clamp-2 text-center text-sm font-semibold text-primaryDarkBlue transition-all duration-300 group-hover:text-secondaryBlue">
          {product.title}
          {/* ({product.storage}) */}
        </h3>
        <div className="flex flex-wrap items-center justify-center text-sm text-secondaryBlue">
          <p>
            {/* {Array(Math.round(product.rating))
              .fill("")
              .map((_, i) => (
                <span key={i}>★</span>
              ))} */}
            ★★★★★
          </p>
          <span className="ml-2 text-gray-500">
            ({product.reviews ? product.reviews.length : 0} Reviews)
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-evenly">
          <Link href="/easy-checkout">
            <p className="text-primbg-primaryWhite scale-90 cursor-pointer rounded-full bg-primaryBlue px-4 py-1 text-sm font-normal text-secondaryWhite transition-all duration-300 hover:bg-primaryDarkBlue hover:text-white md:scale-100 md:px-6 md:font-semibold lg:text-base">
              BUY NOW
            </p>
          </Link>

          <Link href="/cart">
            <div className="cursor-pointer rounded-full bg-secondaryWhite px-4 py-2 text-sm text-secondaryBlue hover:text-primaryBlue md:px-4 lg:text-base">
              <FaShoppingCart />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PriceInfo;
