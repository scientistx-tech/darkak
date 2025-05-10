"use client";
import { useGetUserQuery } from "@/redux/services/authApis";
import { updateUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function DataLoader({ children }: { children: React.ReactNode }) {
  const { currentData, isLoading } = useGetUserQuery();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currentData) {
      dispatch(updateUser(currentData));
    }
  }, [dispatch, currentData]);

  if (isLoading) {
    return  <div className="fixed inset-0 z-50 flex flex-col gap-3 items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
              <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <p className="text-blue-500 font-medium">Getting ready..!</p>
            </div>;
  }
  //console.log(data)
  return <div>{children}</div>;
}

export default DataLoader;
