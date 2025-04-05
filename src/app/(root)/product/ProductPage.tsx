"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Progress, Modal } from "antd";

import BestSelling from "../screen/BestSelling";

import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaRegEye,
  FaCheckCircle,
  FaTimesCircle,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

import icon1 from "@/Data/Icon/fire-icon.svg";

import Img1 from "@/Data/Demo/product-2-1.png";
import Img2 from "@/Data/Demo/product-2-2.avif";
import Img3 from "@/Data/Demo/product-2-3.png";
import Img4 from "@/Data/Demo/product-2-4.png";
import RelatedProducts from "../screen/RelatedProducts";

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<StaticImageData>(Img1);

  const handleImageClick = (image: StaticImageData) => {
    setSelectedImage(image);
  };

  const product = {
    name: "iPad Air M3 - 2025",
    categories: "Product",
    regularPrice: 80200,
    discount: 20,
    newPrice: 79999,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3...",
    mainImage: Img1,
    image1: Img2,
    image2: Img3,
    image3: Img4,
    rating: 3.5,
    reviews: 10,
    cartLink: "/cart",
    buyLink: "/buy",
    favoriteLink: "/wishlist",
    viewing: 40,
    sold: 120,
    item: 80,
  };

  const {
    name,
    categories,
    regularPrice,
    description,
    mainImage,
    image1,
    image2,
    image3,
    rating,
    reviews,
    newPrice,
    viewing,
    sold,
    status,
    item,
  } = product;

  const colors = [
    { name: "Red", value: "#f00" },
    { name: "Yellow", value: "#ffff99" },
    { name: "Dark Gray", value: "#444" },
    { name: "Black", value: "#111" },
  ];

  const [selectedColor, setSelectedColor] = useState<string>("");

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} />
        ))}
      </div>
    );
  };

  // terms and conditions Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [agreed, setAgreed] = useState(true);

  const handleCheckboxChange = () => {
    setAgreed((prev) => !prev);
  };
  return (
    <div className="w-full">
      {/* Top-box */}
      <div className="flex flex-col pt-10 md:flex-row">
        {/* Product Image */}
        <div className="w-full p-4 md:w-1/4">
          <Image
            src={selectedImage}
            alt={name}
            className="h-[300px] w-[300px] rounded-xl object-cover"
          />

          <div className="mt-6 flex w-[300px] justify-evenly">
            <button
              onClick={() => handleImageClick(mainImage)}
              className="rounded-xl border hover:opacity-60"
            >
              <Image
                src={mainImage}
                alt={name}
                className="h-[50px] w-[50px] rounded-lg"
              />
            </button>

            {image1 && (
              <button
                onClick={() => handleImageClick(image1)}
                className="rounded-xl border hover:opacity-60"
              >
                <Image
                  src={image1}
                  alt={name}
                  className="h-[50px] w-[50px] rounded-lg"
                />
              </button>
            )}

            {image2 && (
              <button
                onClick={() => handleImageClick(image2)}
                className="rounded-xl border hover:opacity-60"
              >
                <Image
                  src={image2}
                  alt={name}
                  className="h-[50px] w-[50px] rounded-lg"
                />
              </button>
            )}

            {image3 && (
              <button
                onClick={() => handleImageClick(image3)}
                className="rounded-xl border hover:opacity-60"
              >
                <Image
                  src={image3}
                  alt={name}
                  className="h-[50px] w-[50px] rounded-lg"
                />
              </button>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full bg-white p-4 md:w-2/4">
          <p className="text-2xl font-medium text-secondary">{name}</p>
          {/* <p className="font-serif font-bold opacity-60">
            Categories: {categories}
          </p> */}
          <div className="flex">
            <div className="mt-2 flex items-center gap-1 text-[12px] md:text-base">
              {renderStars()}
            </div>

            <p className="ml-2 mt-3 text-[10px]">({reviews} reviews) </p>
          </div>
          <div className="mt-2 flex">
            <div className="text-xl font-semibold text-secondary">
              Price: {newPrice} TK
            </div>

            <p className="ml-2 line-through">{regularPrice} TK</p>
          </div>
          <div className="mb-5 mt-5 h-0.5 w-full bg-primary opacity-40" />
          <div className="flex">
            <FaRegEye className="text-xl" />{" "}
            <p className="ml-3 mt-[-2px]">
              {viewing} people are viewing this right now
            </p>
          </div>

          <div className="mt-4 flex">
            <Image alt="icon" src={icon1} className="h-6 w-6" />
            <p className="ml-2 text-[#FF6300]">
              {sold} sold in last 10 hour&apos;s
            </p>
          </div>

          <div className="mt-4 flex items-center">
            {status === "In Stock" ? (
              <>
                <FaCheckCircle className="text-xl" />
                <p className="ml-3 text-[#009F05]">{status}</p>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-xl" />
                <p className="ml-3 text-[#FF6300]">{status}</p>
              </>
            )}
          </div>

          <div className="mt-4">
            <label className="mb-2 block font-medium">Color:</label>
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.value)}
                  className={`h-12 w-12 rounded-lg border-2 transition duration-300 ${
                    selectedColor === color.value
                      ? "scale-110 border-primary"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                ></button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p>Only {item} item&apos;s left in stock</p>
            <Progress
              percent={item}
              showInfo={false}
              status="active"
              strokeColor='orange'
              className="w-full md:w-[40%]"
            />
          </div>
          <div className="mt-8 flex w-full text-orange-400 items-center justify-between md:w-[70%]">
            <div className="flex h-[40px] w-[80%] rounded-3xl border-b-2 border-l-2 border-t-2 border-slate-200">
              <div className="flex w-[40%] items-center justify-evenly">
                <button>
                  <FaMinus />
                </button>

                <p className="font-semibold">1</p>

                <button>
                  <FaPlus />
                </button>
              </div>
              <button className="relative mt-[-2px] flex h-[40px] w-[60%] items-center justify-center rounded-3xl border-2 border-white bg-primary text-xl font-medium text-secondary hover:bg-secondary hover:text-white">
                <p>Ard to Cart</p>
              </button>
            </div>

            <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-primary bg-slate-200 text-xl text-black hover:border-secondary">
              <FaHeart />
            </button>
          </div>

          <div className="mt-8 flex items-center">
            <input
              type="checkbox"
              checked={agreed}
              onChange={handleCheckboxChange}
              className="h-4 w-4 cursor-pointer accent-primary"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              I agree with the{" "}
              <button
                onClick={showModal}
                className="text-primary hover:underline dark:text-primary"
              >
                terms and conditions
              </button>
              .
            </label>
          </div>

          <button
            disabled={!agreed}
            className={`group relative mt-4 inline-flex w-full items-center justify-center overflow-hidden rounded-3xl bg-primary p-3 px-5 py-2 text-xl font-medium text-secondary shadow-md transition duration-300 ease-out md:w-[70%] ${
              agreed ? " " : "cursor-not-allowed"
            }`}
          >
            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-secondary text-white duration-300 group-hover:translate-x-0">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="ease absolute flex h-full w-full transform items-center justify-center text-secondary transition-all duration-300 group-hover:translate-x-full">
              Buy it Now
            </span>
            <span className="invisible relative">Buy it Now</span>
          </button>
          <p className="mb-4 mt-10">{description}</p>
          {/* Additional product options and buttons can go here */}
        </div>

        {/* Hot Details */}
        <div className="w-full p-4 md:w-1/4">
          <p className="text-xl font-medium text-secondary">Hot Details</p>

          <div className="mt-5">
            <HotDetailComponent
              name="iPad Air M3 - 2025"
              mainImage={image1}
              sold={40}
              newPrice={2990}
              regularPrice={3900}
            />

            <HotDetailComponent
              name="Product - 2 "
              mainImage={mainImage}
              sold={30}
              newPrice={2990}
              regularPrice={3900}
            />

            <HotDetailComponent
              name="Product - 3 "
              mainImage={image2}
              sold={40}
              newPrice={90}
              regularPrice={80}
            />

            <HotDetailComponent
              name="Product - 4 "
              mainImage={image3}
              sold={40}
              newPrice={1000}
              regularPrice={9999}
            />

            <HotDetailComponent
              name="Product - 5 "
              mainImage={image2}
              sold={40}
              newPrice={190}
              regularPrice={180}
            />

            <HotDetailComponent
              name="iPad Air M3 - 2025"
              mainImage={image1}
              sold={40}
              newPrice={2990}
              regularPrice={3900}
            />

            <HotDetailComponent
              name="Product - 2 "
              mainImage={mainImage}
              sold={30}
              newPrice={2990}
              regularPrice={3900}
            />

            <HotDetailComponent
              name="Product - 3 "
              mainImage={image2}
              sold={40}
              newPrice={90}
              regularPrice={80}
            />

            <HotDetailComponent
              name="Product - 4 "
              mainImage={image3}
              sold={40}
              newPrice={1000}
              regularPrice={9999}
            />

            <HotDetailComponent
              name="Product - 5 "
              mainImage={image2}
              sold={40}
              newPrice={190}
              regularPrice={180}
            />
          </div>
        </div>
      </div>

      {/* Bottom-box */}
      <div className="mt-10 mb-10 md:mb-20">
        <RelatedProducts />
        <BestSelling />
      </div>

      <Modal
        title="Terms and Conditions"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default ProductPage;

const HotDetailComponent: React.FC<{
  mainImage: StaticImageData;
  regularPrice: number;
  newPrice: number;
  name: string;
  sold: number;
}> = ({ mainImage, name, sold, regularPrice, newPrice }) => {
  return (
    <button className="mb-5 flex w-full rounded-xl border bg-white p-2 shadow-2 hover:border-primary">
      <div className="max-h-[130px] w-[30%]">
        <Image src={mainImage} alt="Img" className="h-full w-full rounded-xl" />
      </div>
      <div className="ml-[10%] flex w-[70%] flex-col items-start justify-center">
        <p className="text-lg font-medium text-secondary">{name}</p>

        <div className="flex">
          <p>
            <span className="line-through">{regularPrice}</span> TK
          </p>

          <p className="ml-2 text-secondary">{newPrice} TK</p>
        </div>

        <div className="mt-0 flex">
          <Image alt="icon" src={icon1} className="h-6 w-6" />
          <p className="ml-2 text-[#FF6300]">{sold} sold</p>
        </div>
      </div>
    </button>
  );
};
