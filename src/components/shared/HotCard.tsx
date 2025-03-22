"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Modal, Button } from "antd";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { EyeOutlined, HeartOutlined, LinkOutlined } from "@ant-design/icons";
import Link from "next/link";

interface HotCardProps {
  name: string;
  categories: string;
  regularPrice: number;
  discount: number;
  status: string;
  description: string;
  mainImage: StaticImageData;
  image1: StaticImageData;
  image2: StaticImageData;
  image3: StaticImageData;
  rating: number;
  reviews: number;
  cartLink: string;
  buyLink: string;
  favoriteLink: string;
}

const HotCard: React.FC<HotCardProps> = ({
  name,
  categories,
  regularPrice,
  discount,
  status,
  description,
  mainImage,
  image1,
  image2,
  image3,
  rating,
  reviews,
  cartLink,
  buyLink,
  favoriteLink,
}) => {
  const newPrice = regularPrice - (regularPrice * discount) / 100;
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const shortDescription =
    description.split(" ").slice(0, 15).join(" ") +
    (description.split(" ").length > 15 ? "..." : "");

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevent quantity going below 1
  };

  useEffect(() => {
    setSubTotal(newPrice * quantity);
  }, [quantity, newPrice]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [selectedImage, setSelectedImage] =
    useState<StaticImageData>(mainImage);

  const handleImageClick = (image: StaticImageData) => {
    setSelectedImage(image);
  };
  return (
    <div className="group rounded-md bg-white p-5 transition-all duration-500 hover:shadow-lg">
      <div className="flex">
        <div className="w-[30%]">
          <Image
            alt="img"
            src={mainImage}
            className="h-[200px] w-[200px] rounded"
          />
        </div>

        <div className="absolute mt-[175px] flex gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <button
            className="rounded-lg bg-slate-100 p-1 hover:bg-primary hover:text-secondary"
            onClick={showModal}
          >
            <EyeOutlined className="text-2xl" />
          </button>

          <button className="rounded-lg bg-slate-100 p-1 hover:bg-primary hover:text-secondary">
            <HeartOutlined className="text-2xl" />
          </button>

          <button className="rounded-lg bg-slate-100 p-1 hover:bg-primary hover:text-secondary">
            <LinkOutlined className="text-2xl" />
          </button>
        </div>

        <div className="ml-5 w-[70%]">
          <div className="flex w-full justify-between">
            <p className="text-[12px] text-primary line-through">
              Regular Price: {regularPrice}
            </p>

            <div className="rounded-md bg-primary px-1 pl-2 pr-2 font-medium text-secondary">
              <p>{discount}% OFF</p>
            </div>
          </div>
          <p className="font-semibold text-green-600">
            Price: {newPrice.toFixed(2)}
          </p>
          <p className="text-xl text-secondary">{name}</p>
          <p>{shortDescription}</p>

          <p>Raring: ({reviews} reviews)</p>
          <div className="mt-2 flex items-center gap-1">{renderStars()}</div>
        </div>
      </div>

      <div className="mt-4 flex justify-evenly">
        <Link
          href={buyLink}
          className="rounded-full border border-primary bg-transparent p-1 pl-4 pr-4 text-xl font-medium text-secondary hover:bg-primary"
        >
          Buy Now
        </Link>

        <Link
          href={cartLink}
          className="rounded-full border border-primary bg-primary p-1 pl-4 pr-4 text-xl font-medium text-secondary hover:bg-transparent hover:text-primary"
        >
          Add to Cart
        </Link>
      </div>

      <Modal
        title="Add to Cart"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <div className="h-auto">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="w-full p-4 md:w-1/2">
              <Image
                src={selectedImage}
                alt={name}
                className="h-[300px] w-[300px] rounded-xl object-cover"
              />

              <div className="mt-6 flex w-full justify-evenly">
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
            <div className="tablet:w-1/2 w-full p-4">
              <p className="text-2xl font-medium">{name}</p>
              <p className="font-serif font-bold opacity-60">
                Categories: {categories}
              </p>
              <p className="text-red-500 line-through opacity-70">
                Tk {regularPrice}
              </p>
              <p className="mb-4 text-2xl font-medium text-secondary">
                Tk {newPrice.toFixed(2)}
              </p>
              <p className="mb-4">{description}</p>

              {/* Size and Color selectors */}
              <div className="mb-4">
                <label className="block font-medium">Size:</label>
                <select className="w-full rounded border p-2">
                  <option>s</option>
                  <option>m</option>
                  <option>l</option>
                  <option>xl</option>
                  <option>2xl</option>
                  <option>3xl</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium">Color:</label>
                <select className="w-full rounded border p-2">
                  <option>red</option>
                  <option>blue</option>
                  <option>green</option>
                </select>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <div className="mb-4 flex items-center">
                  <button
                    className="rounded-md border p-1 px-3 text-xl"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>

                  <p className="rounded-md border-b border-t p-1 px-3 text-xl">
                    {quantity}
                  </p>
                  <button
                    className="rounded-md border p-1 px-3 text-xl"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>

                {/* Display Subtotal */}
                <p className="text-lg font-semibold">
                  Sub Total:{" "}
                  <samp className="text-secondary">{subTotal.toFixed(2)}</samp>
                  Tk
                </p>
              </div>

              <button
                className="rounded bg-primary p-1 px-3 text-xl font-medium"
                onClick={handleCancel}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HotCard;
