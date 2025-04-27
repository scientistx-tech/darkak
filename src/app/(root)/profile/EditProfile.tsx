import React from 'react'
import {
    
    FaPen,
  } from "react-icons/fa";

export default function EditProfile() {
  return (
    <div className="w-full rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-[#00153B]">
            Edit profile
          </h2>
    
          <div className="relative">
            <label className="font-medium text-primary">Name:</label>
            <input
              className="mt-2 w-full rounded border-[2px] border-primary px-6 py-2 text-black outline-none placeholder:text-black"
              placeholder="Enter Your Name"
            />
            <FaPen className="absolute right-4 top-11 cursor-pointer text-gray-400" />
          </div>
    
          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button className="rounded-full bg-[#648EF7] px-6 py-2 text-white hover:bg-[#4d77e5]">
              Update
            </button>
          </div>
        </div>
  )
}
