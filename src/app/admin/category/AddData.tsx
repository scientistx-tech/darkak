import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function AddData() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleSubmit = () => {
    if (!title || !imageFile) {
      alert("Please provide both title and image.");
      return;
    }

    // Example submission logic
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageFile);

    // API call goes here...
    console.log("Submitted:", title, imageFile);
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
      <div className="text-xl font-semibold">Add Category</div>

      <Input
        placeholder="Category Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2"
      />

      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="mt-2 h-32 w-32 object-cover rounded"
        />
      )}

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default AddData;
