import {
  useCreateProductAttributeMutation,
  useUpdateProductAttributeMutation,
} from "@/redux/services/admin/adminProductApis";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddAttributeProps {
  refetch: () => void;
  value?: {
    id: string;
    title: string;
  };
  setIsEditable?: (arg: {
    status: boolean;
    value: { id: string; title: string };
  }) => void;
}
const AddAttributes = ({
  refetch,
  value,
  setIsEditable,
}: AddAttributeProps) => {
  const [currentLanguage, setCurrentLanguage] = useState("English(EN)");
  const [title, setTitle] = useState(value?.title || "");

  const [createProductAttribute] = useCreateProductAttributeMutation();
  const [updateProductAttribute] = useUpdateProductAttributeMutation();

  React.useEffect(() => {
    if (value?.title !== undefined) {
      setTitle(value?.title);
    }
  }, [value?.title]);

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Enter title first");
      return;
    }
    const data = { title };
    try {
      if (value && value.id) {
        await updateProductAttribute({ id: value.id, data }).unwrap();
        toast.success("Attribute Updated successfully!");
        if (setIsEditable) {
          setIsEditable({ status: false, value: { id: "", title: "" } });
        }
      } else {
        await createProductAttribute(data).unwrap();
        toast.success("Attribute created successfully!");
      }
      refetch();
      setTitle("");
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Failed to create category.");
    }
  };

  return (
    <div>
      {/* Language Tabs */}
      <div className="mb-6 flex gap-6">
        {["English(EN)", "Bangla(BD)"].map((lang, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentLanguage(lang)}
            className={`pb-2 font-medium ${
              currentLanguage === lang
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Form Input */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow">
        <label className="mb-2 block font-medium text-gray-700">
          Attribute Name<span className="ml-1 text-red-500">*</span>{" "}
          {`(${currentLanguage === "English(EN)" ? "EN" : "BD"})`}
        </label>
        <input
          type="text"
          placeholder="Enter Attribute Name"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-4">
          {value && value.id ? (
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAttributes;
