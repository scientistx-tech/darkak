import { Product } from "@/app/(root)/types/ProductType";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const PriceInfo: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <Link href="/product" className="group">
        <div className="xl:space-y space-y-2 md:space-y-1 lg:space-y-2 p-2 text-center xl:p-6 flex flex-col justify-between md:h-[150px] xl:h-[200px] 2xl:h-[170px]">
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span className="md:text-md text-sm font-bold text-primaryDarkBlue">
              Price: {product.price} TK
            </span>
            <span className="text-xs text-gray-400 line-through md:text-sm">
              {product.originalPrice} TK
            </span>
          </div>
          <h3 className="md:text-md line-clamp-2 text-center text-sm font-semibold text-primaryDarkBlue transition-all duration-300 group-hover:text-secondaryBlue">
            {product.name} ({product.storage})
          </h3>
          <div className="flex flex-wrap items-center justify-center text-sm text-secondaryLiteBlue">
            {Array(Math.round(product.rating))
              .fill("")
              .map((_, i) => (
                <span key={i}>★</span>
              ))}
            <span className="ml-2 text-gray-500">
              ({product.reviews} Reviews)
            </span>
          </div>
  
          {/* Buttons */}
          <div className="flex items-center justify-evenly">
            <Link href="/easy-checkout">
              <p className="text-primbg-primaryWhite scale-90 cursor-pointer rounded-full bg-secondaryBlue px-4 py-2 text-sm font-medium text-secondaryWhite transition-all duration-300 hover:bg-primaryBlue hover:text-white md:scale-100 md:px-6 md:font-semibold lg:text-base">
                BUY NOW
              </p>
            </Link>
  
            <Link href="/cart">
              <div className="cursor-pointer rounded-full bg-secondaryWhite px-3 py-2 text-sm text-secondaryBlue hover:text-primaryBlue md:px-4 lg:text-base">
                <FaShoppingCart />
              </div>
            </Link>
          </div>
        </div>
      </Link>
    );
  };
  export default PriceInfo;