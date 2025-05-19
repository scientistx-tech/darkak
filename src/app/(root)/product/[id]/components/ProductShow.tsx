"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactImageMagnify from "react-image-magnify";
import { BsWhatsapp } from "react-icons/bs";
import DeliveryDetails from "./DeliveryDetails";
import Image from "next/image";

const ProductShow = ({
  data,
  slug,
}: {
  data: {
    product: {
      title: string;
      brand: {
        title: string;
      };
      Image: {
        url: string;
      }[];
      discount: string;
      discount_type: string;
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
  slug: string;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{
    [itemId: number]: number;
  }>({});

  // 1. Find the color item and check if all options have image
  const colorItem = data?.product?.items?.find(
    (item: any) => item.title?.toLowerCase() === "color",
  );

  const colorOptionImages =
    colorItem &&
    Array.isArray(colorItem.options) &&
    colorItem.options.length > 0
      ? colorItem.options.every((opt: any) => !!opt.image)
        ? colorItem.options.map((opt: any) => opt.image)
        : null
      : null;

  //  Decide which images to show
  const productImages =
    colorOptionImages && colorOptionImages.length > 0
      ? colorOptionImages
      : data?.product?.Image?.map((img: any) => img.url) || [];

  const fallbackImage = "/images/fallback.png";

  //  Selected image state
  const [selectedImage, setSelectedImage] = useState<string>(
    productImages[0] || fallbackImage,
  );

  //  Update selectedImage if productImages change
  useEffect(() => {
    setSelectedImage(productImages[0] || fallbackImage);
  }, [JSON.stringify(productImages)]);

  const hasDiscount =
    !!data?.product?.discount && Number(data.product.discount) > 0;
  const price = Number(data?.product?.price) || 0;
  const discount = Number(data?.product?.discount) || 0;
  const discountType = data?.product?.discount_type;
  let discountPrice = price;

  if (hasDiscount) {
    if (discountType === "flat") {
      discountPrice = price - discount;
    } else if (discountType === "percentage") {
      discountPrice = price - (price * discount) / 100;
    }
  }

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

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Image Section */}
        <div className="rounded-md border p-4">
          <div className="relative mx-auto w-full max-w-md">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: data?.product.title,
                  isFluidWidth: false,
                  width: 400,
                  height: 400,
                  src: selectedImage,
                },
                largeImage: {
                  src: selectedImage,
                  width: 900, // Still high-resolution but reasonable
                  height: 900,
                },
                enlargedImageContainerDimensions: {
                  width: "180%", // More zoom than default but not overkill
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
                  width: 80, // You can make it 80 or even 60 for finer zoom control
                  height: 60,
                },
              }}
            />
            {data?.product.discount && (
              <div className="absolute left-0 top-6 rounded-r-full bg-secondaryBlue px-3 py-2 text-xs text-white shadow-md">
                {data?.product.discount}
                {data?.product?.discount_type === "flat" ? "৳" : "%"} OFF
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-center gap-3">
            {productImages.map((img, idx) => (
              <img
                key={idx}
                onClick={() => setSelectedImage(img)}
                src={img}
                className={`h-16 w-16 cursor-pointer rounded border object-cover ${
                  selectedImage === img
                    ? "border-primaryBlue ring-2 ring-primaryBlue"
                    : ""
                }`}
                alt={`thumb-${idx}`}
                style={{ transition: "box-shadow 0.2s" }}
              />
            ))}
          </div>
        </div>
        {/* Details Section */}
        <div>
          <p className="text-sm uppercase text-[#4B4E55]">
            Brand: {data?.product?.brand?.title}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-[#4B4E55]">
            {data?.product?.title}
          </h1>

          <div className="mt-4 flex gap-2">
            <span
              className={`rounded-full bg-secondaryWhite px-4 py-2 text-sm text-primaryBlue ${
                hasDiscount ? "line-through" : ""
              }`}
            >
              {price} BDT
            </span>
            {hasDiscount && (
              <span className="rounded-full bg-secondaryWhite px-4 py-2 text-sm font-semibold text-primaryBlue">
                {discountPrice} BDT
              </span>
            )}
            <span className="rounded-full bg-secondaryWhite px-4 py-2 text-sm text-primaryBlue">
              {data?.product?.available}
            </span>
          </div>

          <p className="mt-4 inline-block rounded-full bg-secondaryWhite px-4 py-2 text-sm">
            Product Code: {data?.product.code}
          </p>

          <a
            href="https://wa.me/8801000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-max items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700"
          >
            <BsWhatsapp className="h-5 w-5" />
            Message on Whatsapp
          </a>

          <div className="mt-6 text-lg font-semibold text-[#323232]">
            <p className="inline text-sm text-gray-500">Warranty:</p>{" "}
            {data?.product.warranty} <p>{data?.product.warranty_time}</p>
          </div>

          {data?.product?.items.map((item: any, i: number) => (
            <div key={item.id} className="mt-4 flex gap-4">
              <p className="text-sm font-medium">{item?.title}:</p>
              <div className="flex flex-wrap gap-3">
                {item.options.map((option: any, idx: number) => (
                  <div
                    key={option.id}
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [item.id]: option.id,
                      }))
                    }
                    className={`cursor-pointer rounded-full border-2 px-4 py-0.5 transition-colors duration-200 ${
                      selectedOptions[item.id] === option.id
                        ? "border-primaryBlue bg-primaryBlue text-white"
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
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-secondaryBlue px-4 py-1 text-white transition-all duration-300 hover:bg-primaryBlue"
              >
                +
              </button>
            </div>
          </div>
          <DeliveryDetails
            deliveryInfo={data?.product?.delivery_info}
          ></DeliveryDetails>
          {/* Buttons */}
          <div className="mt-6 flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="rounded-full border-2 bg-primaryBlue px-8 py-2 text-white transition-all duration-300 hover:border-primaryBlue hover:bg-secondaryWhite hover:text-primaryDarkBlue"
              onClick={() => alert("Buying...")}
            >
              BUY NOW
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-primaryBlue px-8 py-2 text-primaryDarkBlue"
              onClick={() => alert("Added to cart")}
            >
              ADD TO CART
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
