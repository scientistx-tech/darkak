"use client";
import { useGetAdminQuery } from "@/redux/services/authApis";
import { updateUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function DataLoader({ children }: { children: React.ReactNode }) {
  const { currentData, isLoading } = useGetAdminQuery();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currentData) {
      dispatch(updateUser(currentData));
    }
  }, [dispatch, currentData]);

  if (isLoading) {
    return <p>loading...</p>;
  }
  //console.log(data)
  return <div>{children}</div>;
}

export default DataLoader;
