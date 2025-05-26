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
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white bg-opacity-80 backdrop-blur-sm">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
        <p className="font-medium text-blue-500">Getting ready..!</p>
      </div>
    );
  }
  //console.log(data)
  return <div>{children}</div>;
}

export default DataLoader;
