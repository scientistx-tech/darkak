"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactImageMagnify from "react-image-magnify";
import { BsWhatsapp } from "react-icons/bs";
import DeliveryDetails from "./DeliveryDetails";
import Image from "next/image";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAddToCartMutation } from "@/redux/services/client/myCart";
import { setCart } from "@/redux/slices/authSlice";

interface ProductShowProps {
  data: {
    product: {
      id: number;
      title: string;
      brand: {
        title: string;
      };
      Image: {
        url: string;
      }[];
      thumbnail: string;
      discount: string;
      discount_type: string;
      stock: number;
      available: string;
      price: string;
      code: string;
      warranty_time: string;
      warranty: string;
      delivery_info: {
        delivery_time: string;
        delivery_charge: number;
        return_days: string;
        delivery_time_outside: string;
        delivery_charge_outside: number;
      };
      items: {
        id: number;
        title: string;
        options: {
          id: number;
          title: string;
          image?: string;
        }[];
      }[];
    };
  };
  slug?: string;
}

const ProductShow = ({ data, slug }: ProductShowProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{
    [itemId: number]: number;
  }>({});

  // redux hooks
  const [addToCart, { isLoading }] = useAddToCartMutation();

  // redux state
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // Detect if device is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Collect all images: product images, thumbnail, color option images
  const productImagesArr =
    data?.product?.Image?.map((img: any) => img.url) || [];
  const thumbnailImg = data?.product?.thumbnail ? [data.product.thumbnail] : [];
  const colorOptionImagesArr =
    data?.product?.items
      ?.filter((item: any) => item.title?.toLowerCase() === "color")
      .flatMap((item: any) =>
        Array.isArray(item.options)
          ? item.options.map((opt: any) => opt.image).filter(Boolean)
          : [],
      ) || [];

  const allImages = Array.from(
    new Set(
      [...productImagesArr, ...thumbnailImg, ...colorOptionImagesArr].filter(
        Boolean,
      ),
    ),
  );

  const fallbackImage = "/images/fallback.png";

  //  Selected image state
  const [selectedImage, setSelectedImage] = useState<string>(
    allImages[0] || fallbackImage,
  );

  //  Update selectedImage if productImages change
  useEffect(() => {
    setSelectedImage(allImages[0] || fallbackImage);
  }, [JSON.stringify(allImages)]);

  //  Check if product has discount
  const hasDiscount =
    !!data?.product?.discount && Number(data.product.discount) > 0;
  const price = Number(data?.product?.price) || 0;
  const discount = Number(data?.product?.discount) || 0;
  const discountType = data?.product?.discount_type;
  let discountPrice = price;

  // Calculate discount price based on type
  if (hasDiscount) {
    if (discountType === "flat") {
      discountPrice = price - discount;
    } else if (discountType === "percentage") {
      discountPrice = price - (price * discount) / 100;
    }
  }

  //  Set initial selected options
  //  If product has images, set the first image as selected
  useEffect(() => {
    if (data?.product?.Image && data.product.Image.length > 0) {
      setSelectedImage(data.product.Image[0].url);
    } else {
      setSelectedImage(fallbackImage);
    }
    if (data?.product?.items) {
      const initialSelected: { [itemId: number]: number } = {};
      data.product.items.forEach((item: any) => {
        if (item.options && item.options.length > 0) {
          initialSelected[item.id] = item.options[0].id;
        }
      });
      setSelectedOptions(initialSelected);
    }
  }, [data?.product?.items, data?.product?.Image]);

  //  Build cart object
  //  This function creates a cart object based on the product data
  const buildCartObject = (product: any) => {
    const cart = {
      id: Math.floor(Math.random() * 100000), // Random ID, replace if needed
      userId: user?.id,
      productId: product.id,
      quantity: quantity,
      date: new Date().toISOString(),
      cart_items: [],
      product: {
        title: product.title,
        thumbnail: product.thumbnail,
        stock: product.stock,
        minOrder: product.minOrder,
        price: product.price,
        discount: product.discount,
        discount_type: product.discount_type,
      },
    };

    // Extract first option from each item (if any)
    const selectedOptions = product.items
      ?.map((item: any) => item.options?.[0])
      .filter(Boolean);
    cart.cart_items = selectedOptions.map((option: any) => ({ option }));

    return cart;
  };

  //  Handle Buy Now
  //  This function handles the "Buy Now" button click
  const handleBuyNow = async () => {
    const cartObject = buildCartObject(data?.product);
    console.log("cartobject", cartObject);
    try {
      localStorage.setItem("checkout_items", JSON.stringify([cartObject]));
      // dispatch(setCart(Math.random()));
      // toast.success("Item added to cart!");
      router.push("/easy-checkout");
    } catch (error: any) {
      if (error?.status === 401) {
        return router.replace("/auth/login");
      }
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  //  Handle Add to Cart
  //  This function handles the "Add to Cart" button click
  const handleAddToCart = async (e: any) => {
    e.stopPropagation(); // Prevent navigation to product detail page

    const optionIds = data?.product?.items?.length
      ? data?.product?.items
          .map((item: any) => item.options?.[0]?.id)
          .filter(Boolean)
      : [];

    try {
      const result = await addToCart({
        productId: data?.product?.id,
        quantity: quantity,
        optionIds,
      }).unwrap();
      dispatch(setCart(Math.random()));
      toast.success("Item added to cart!");
    } catch (error: any) {
      if (error?.status === 401) {
        return router.replace("/auth/login");
      }
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };
  return (
    <div className="py-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-10">
        {/* Image Section */}
        <div className="rounded-md p-2 md:p-4">
          <div className="relative mx-auto w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
            {isMobile ? (
              <Image
                width={600}
                height={600}
                src={selectedImage}
                alt={data?.product.title}
                className="h-auto w-full rounded object-cover"
                style={{ maxHeight: "60vh" }}
              />
            ) : (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: data?.product.title,
                    isFluidWidth: true,
                    src: selectedImage,
                    width: 400,
                    height: 400,
                  },
                  largeImage: {
                    src: selectedImage,
                    width: 900,
                    height: 900,
                  },
                  enlargedImageContainerDimensions: {
                    width: "180%",
                    height: "100%",
                  },
                  enlargedImageContainerStyle: {
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "0.5rem",
                    zIndex: 99,
                  },
                  enlargedImagePosition: "beside",
                  isHintEnabled: true,
                  hintTextMouse: "Hover to zoom",
                  lensStyle: {
                    backgroundColor: "rgba(255,255,255,0.4)",
                    border: "1px solid #ccc",
                  },
                  lensDimensions: {
                    width: 80,
                    height: 60,
                  },
                }}
              />
            )}
            {data?.product.discount && (
              <div className="absolute left-0 top-6 rounded-r-full bg-secondaryBlue px-3 py-2 text-xs text-white shadow-md">
                {data?.product.discount}
                {data?.product?.discount_type === "flat" ? "৳" : "%"} OFF
              </div>
            )}
          </div>

          <div
            className="scrollbar-thin hide-scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 mx-auto mt-4 flex max-w-[320px] flex-row gap-x-3 overflow-x-auto py-2 sm:max-w-sm md:max-w-md lg:max-w-lg"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {allImages.map((img, idx) => (
              <img
                key={idx}
                onClick={() => setSelectedImage(img)}
                src={img}
                className={`h-16 w-16 min-w-16 flex-shrink-0 cursor-pointer rounded border object-cover ${
                  selectedImage === img
                    ? "border-primaryBlue ring-2 ring-primaryBlue"
                    : ""
                }`}
                alt={`thumb-${idx}`}
                style={{
                  transition: "box-shadow 0.2s",
                  scrollSnapAlign: "start",
                }}
              />
            ))}
          </div>
        </div>
        {/* Details Section */}
        <div className="flex flex-1 flex-col items-center justify-center md:items-start md:justify-start">
          <p className="text-sm uppercase text-[#4B4E55]">
            Brand: {data?.product?.brand?.title}
          </p>
          <h1 className="mt-2 text-center text-2xl font-semibold text-[#4B4E55]">
            {data?.product?.title}
          </h1>

          <div className="mt-4 flex gap-2">
            <span
              className={`rounded bg-secondaryWhite px-4 py-2 text-sm text-primaryBlue shadow-1 ${
                hasDiscount ? "line-through" : ""
              }`}
            >
              {price} BDT
            </span>
            {hasDiscount && (
              <span className="rounded bg-secondaryWhite px-4 py-2 text-sm font-semibold text-primaryBlue shadow-1">
                {discountPrice} BDT
              </span>
            )}
            <span className="">
              {data?.product?.stock > 0 ? (
                <div className="flex items-center gap-2 rounded bg-secondaryWhite px-4 py-2 text-sm text-primaryBlue shadow-1">
                  <p>In Stock</p>
                  <p>{`(${data?.product?.stock} items)`}</p>
                </div>
              ) : (
                <p className="rounded bg-red-100 px-4 py-2 text-sm text-red shadow-1">
                  Out of Stock
                </p>
              )}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-4 md:mt-4">
            {" "}
            <p className="mt-4 inline-block rounded-full bg-secondaryWhite px-4 py-2 text-xs md:text-sm">
              Product Code: {data?.product.code}
            </p>
            <a
              href="https://wa.me/8801000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-max items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs text-green-700 md:text-sm"
            >
              <BsWhatsapp className="h-5 w-5" />
              Message on Whatsapp
            </a>
          </div>

          <div className="mt-6 text-sm font-semibold text-[#323232]">
            <p className="inline text-sm text-gray-500">Warranty Type:</p>{" "}
            {data?.product.warranty}{" "}
            <p className="inline animate-pulse">{`(${data?.product.warranty_time})`}</p>
          </div>

          {data?.product?.items.map((item: any, i: number) => (
            <div key={item.id} className="mt-4 flex gap-4">
              <p className="text-sm font-medium">{item?.title}:</p>
              <div className="flex flex-wrap gap-3">
                {item.options.map((option: any, idx: number) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [item.id]: option.id,
                      }));
                      if (option.image) {
                        setSelectedImage(option.image);
                      }
                    }}
                    className={`cursor-pointer rounded-full border-2 px-4 py-0.5 transition-colors duration-200 ${
                      selectedOptions[item.id] === option.id
                        ? "border-primaryBlue bg-primaryBlue text-white shadow-2"
                        : "border-blue-300 bg-white text-primaryBlue"
                    }`}
                  >
                    {option.title}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Color */}
          {/* <div className="mt-4 flex items-center gap-4">
            <p className="text-sm font-medium">Color: </p>
            <div className="mt-2 flex gap-3">
              {product.colors.map((clr, idx) => (
                <div
                  key={idx}
                  onClick={() => setColor(clr)}
                  className={`h-6 w-6 cursor-pointer rounded-full border-2`}
                  style={{
                    backgroundColor: clr,
                    borderColor: color === clr ? "#3b82f6" : "#ccc",
                  }}
                />
              ))}
            </div>
          </div> */}

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-sm font-medium">Quantity</p>
            <div className="flex items-center overflow-hidden rounded-full border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-secondaryBlue px-4 py-1 text-white transition-all duration-300 hover:bg-primaryBlue"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity(Math.min(quantity + 1, data?.product?.stock || 1))
                }
                className="bg-secondaryBlue px-4 py-1 text-white transition-all duration-300 hover:bg-primaryBlue"
                disabled={quantity >= (data?.product?.stock || 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <DeliveryDetails
            deliveryInfo={data?.product?.delivery_info}
          ></DeliveryDetails>
          {data?.product?.stock > 0 ? (
            <div className="mt-6 flex items-center gap-4">
              <button
                className="rounded-full border-2 bg-primaryBlue px-8 py-2 text-white transition-all duration-300 hover:border-primaryBlue hover:bg-secondaryWhite hover:text-primaryDarkBlue"
                onClick={() => {
                  if (data?.product?.stock > 0) {
                    handleBuyNow();
                  } else {
                    toast.info("Product is out of stock");
                  }
                }}
              >
                BUY NOW
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border-2 border-primaryBlue px-8 py-2 text-primaryDarkBlue"
                onClick={(e) => {
                  if (data?.product?.stock > 0) {
                    handleAddToCart(e);
                  } else {
                    toast.info("Product is out of stock");
                  }
                }}
              >
                ADD TO CART
              </motion.button>
            </div>
          ) : (
            <button
              className="mt-6 rounded-full border-2 bg-rose-600 px-8 py-2 text-white transition-all duration-300 hover:border-rose-600 hover:bg-rose-50 hover:text-primaryDarkBlue"
              onClick={() => {
                handleBuyNow();
              }}
            >
              Pre Order
            </button>
          )}

          {/* Buttons */}
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
