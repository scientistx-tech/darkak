"use client";
import React from "react";

interface OTPInputsProps {
  otp: string[];
  onChange: (index: number, value: string) => void;
}

const OTPInputs: React.FC<OTPInputsProps> = ({ otp, onChange }) => {
  return (
    <div className="relative mb-4 mt-2 flex w-[90%] justify-evenly md:w-[70%]">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => onChange(index, e.target.value)}
          className="peer block w-[50px] rounded border border-gray-300 bg-white p-2 text-center leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
      ))}
    </div>
  );
};

export default OTPInputs;
