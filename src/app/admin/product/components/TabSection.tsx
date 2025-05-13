import React, { useState } from "react";
import Button from "../../components/Button";
import CustomEditor from "../../components/CustomEditor";

const TabSection = () => {
  const [activeTab, setActiveTab] = useState<"spec" | "warranty" | "desc">(
    "spec",
  );

  const handleTabChange = (tab: "spec" | "warranty" | "desc") => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h3 className="font-bold">Product Info</h3>
      {/* Buttons */}
      <div className="mb-6 mt-3 grid gap-4 sm:grid-cols-3">
        <Button
          onClick={() => handleTabChange("spec")}
          className={
            activeTab === "spec"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700"
          }
        >
          Specification
        </Button>

        <Button
          onClick={() => handleTabChange("warranty")}
          className={
            activeTab === "warranty"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700"
          }
        >
          Warranty
        </Button>

        <Button
          onClick={() => handleTabChange("desc")}
          className={
            activeTab === "desc"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700"
          }
        >
          Description
        </Button>
      </div>

      {/* Content */}
      <div className="rounded-md border p-4 shadow-sm">
        {activeTab === "spec" && (
          <div>
            <h4 className="font-bold">Make Specification</h4>
            <CustomEditor />
          </div>
        )}
        {activeTab === "warranty" && (
          <div>
            <h4 className="font-bold">Make Warranty</h4>
           <CustomEditor />
          </div>
        )}
        {activeTab === "desc" && (
          <div>
            <h4 className="font-bold">Make Description</h4>
            <CustomEditor />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSection;
