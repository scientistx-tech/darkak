"use client";

import React from "react";

const ClientLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default ClientLoading;
