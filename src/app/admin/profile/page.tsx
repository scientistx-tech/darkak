"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

import { useEffect, useState } from "react";
import { CameraIcon } from "./_components/icons";
import { SocialAccounts } from "./_components/social-accounts";
import { FaCamera } from "react-icons/fa";
import { useGetUserQuery } from "@/redux/services/authApis";
import { useUpdateUserProfilePictureMutation } from "@/redux/services/userApis";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/slices/authSlice";

export default function Page() {
  const { data, isLoading, isError, refetch } = useGetUserQuery(undefined);
  const [updateProfilePicture] = useUpdateUserProfilePictureMutation();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>()
  // ✅ Dispatch only when user data changes
  useEffect(() => {
    if (data) {
      dispatch(updateUser(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data?.image) {
      setImagePreview(data.image);
    }
  }, [data]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await updateProfilePicture(formData).unwrap();
      toast.success("Profile picture updated!");
      refetch();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload profile picture.");
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={"/images/cover/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
            style={{
              width: "auto",
              height: "auto",
            }}
          />

        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            <div className="relative drop-shadow-2">

              <Image
                src={imagePreview || "/default-avatar.png"}
                alt="Profile"
                width={160}
                height={160}
                className="h-[160px] w-[160px] rounded-full border-[5px] border-primaryBlue object-cover"
              />
              <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white p-2 shadow-md">
                {isUploading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                ) : (
                  <>
                    <FaCamera className="text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </>
                )}
              </label>

            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
              {data?.name}
            </h3>
            <p className="font-medium">{data?.isAdmin ? 'Admin' : data?.isSeller ? 'Seller' : 'Moderator'}</p>


            <div className="mx-auto max-w-[720px]">
              <h4 className="font-medium text-dark dark:text-white">
                About Darkak
              </h4>
              <p className="mt-4">
                Looking for premium quality bags, stylish watches, and the latest electronics
                in Bangladesh? Darkak Mart offers a wide
                range of directly imported, top-tier products. Explore our exclusive collections
                at darkak.com.bd.
              </p>
            </div>

            {/* <SocialAccounts /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
