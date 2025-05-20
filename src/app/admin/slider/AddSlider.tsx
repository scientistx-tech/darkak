"use client";

import React, { useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "react-select";
import Image from "next/image";
import { useUploadFormDataSliderMutation } from "@/redux/services/admin/adminSliderApis";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "@/redux/services/admin/adminProductApis";

function AddSlider({ header }: { header: string }) {
  const [title, setTitle] = useState("");
  const [offerName, setOfferName] = useState("");
  const [details, setDetails] = useState("");
  const [productId, setProductId] = useState("");
  const [bannerFile, setBannerFile] = useState<any>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createSlider] = useUploadFormDataSliderMutation();
  const {
    data: productData,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({});

  console.log(productData, "pro duc");

  // Example product options
  const productOptions = [
    { value: "1", label: "T-shirt - ID 1" },
    { value: "2", label: "Sneakers - ID 2" },
    { value: "3", label: "Saree - ID 3" },
    { value: "4", label: "Watch - ID 4" },
  ];

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBanner(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !offerName || !details || !productId) {
      toast.error("Please fill in all fields and upload a banner image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("offer_name", offerName);
    formData.append("details", details);
    formData.append("productId", productId);
    formData.append("banner", imageFile as File);
    try {
      await createSlider(formData).unwrap();
      toast.success("Succesfully Added Slider");
    } catch (error) {
      toast.error("Something went wrong, try again");
      console.log("slider createion error", error);
    } finally {
      setTitle("");
      setOfferName("");
      setDetails("");
      setProductId("");
      setPreviewImage(null);
    }
  };

  return (
    <div className="mx-auto mt-6 w-full rounded-lg bg-white p-6 shadow-1">
      <h2 className="mb-4 text-2xl font-semibold">{header}</h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3"
        />
        <Input
          placeholder="Offer Name"
          value={offerName}
          onChange={(e) => setOfferName(e.target.value)}
          className="mb-3"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Input
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="mb-3"
        />
        {/* Product selector */}
        <div className="h-[50px] w-full rounded bg-gray-4">
          <select
            onChange={(e) => setProductId(e.target?.value || "")}
            className="h-full w-full rounded bg-slate-100"
          >
            <option value="">Select Product</option>
            {productData?.data?.map((p: any, i: number) => (
              <option key={i} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {header === "Add Slider" && (
        <div
          className="mt-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              setImageFile(file);
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreviewImage(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        >
          <label
            htmlFor="file-upload"
            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50"
          >
            {previewImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full rounded-lg object-contain py-3"
                  width={150}
                  height={150}
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setPreviewImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image
                  width={30}
                  height={30}
                  src="/images/icon/icon-image.png"
                  alt="image-icon"
                />
                <p className="my-2 text-sm text-gray-500">
                  Drag and drop an image, or{" "}
                  <span className="text-blue-500">Upload</span>
                </p>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </label>
        </div>
      )}

      <div className="mt-4">
        <Button onClick={handleSubmit}>Submit Slider</Button>
      </div>
    </div>
  );
}

export default AddSlider;
