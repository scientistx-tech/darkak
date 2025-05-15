import { useState } from "react";
import * as Yup from "yup";
import { DatePicker } from "./DatePicker";

const bonusSchema = Yup.object().shape({
  bonusTitle: Yup.string().required("Bonus Title is required"),
  shortDescription: Yup.string().required("Short Description is required"),
  bonusType: Yup.string()
    .oneOf(["Percentage(%)"], "Select a valid bonus type")
    .required("Bonus Type is required"),
  bonusAmount: Yup.number()
    .min(0, "Bonus Amount must be at least 0")
    .required("Bonus Amount is required"),
  minimumAddAmount: Yup.number()
    .min(0, "Minimum Add Amount must be at least 0")
    .required("Minimum Add Amount is required"),
  maximumBonus: Yup.number()
    .min(0, "Maximum Bonus must be at least 0")
    .required("Maximum Bonus is required"),
  startDate: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Start Date must be in MM/DD/YYYY format")
    .required("Start Date is required"),
  endDate: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "End Date must be in MM/DD/YYYY format")
    .required("End Date is required"),
});

export const BonusForm: React.FC = () => {
  const [formData, setFormData] = useState({
    bonusTitle: "",
    shortDescription: "",
    bonusType: "",
    bonusAmount: "",
    minimumAddAmount: "",
    maximumBonus: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    try {
      await bonusSchema.validate(formData, { abortEarly: false });
      console.log("Bonus Data:", formData);
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      bonusTitle: "",
      shortDescription: "",
      bonusType: "",
      bonusAmount: "",
      minimumAddAmount: "",
      maximumBonus: "",
      startDate: "",
      endDate: "",
    });
    setErrors({});
  };

  return (
    <div className="mb-4 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Bonus Title</label>
          <input
            type="text"
            placeholder="Ex:EID Dhamaka"
            value={formData.bonusTitle}
            onChange={(e) => handleInputChange("bonusTitle", e.target.value)}
            className={`rounded border p-2 text-sm ${errors.bonusTitle ? "border-red-500" : ""}`}
          />
          {errors.bonusTitle && (
            <p className="text-xs text-red-500">{errors.bonusTitle}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Short Description</label>
          <input
            type="text"
            placeholder="Ex:EID Dhamaka"
            value={formData.shortDescription}
            onChange={(e) =>
              handleInputChange("shortDescription", e.target.value)
            }
            className={`rounded border p-2 text-sm ${errors.shortDescription ? "border-red-500" : ""}`}
          />
          {errors.shortDescription && (
            <p className="text-xs text-red-500">{errors.shortDescription}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Bonus Type</label>
          <select
            value={formData.bonusType}
            onChange={(e) => handleInputChange("bonusType", e.target.value)}
            className={`rounded border p-2 text-sm ${errors.bonusType ? "border-red-500" : ""}`}
          >
            <option value="">Select Bonus Type</option>
            <option value="Percentage(%)">Percentage(%)</option>
          </select>
          {errors.bonusType && (
            <p className="text-xs text-red-500">{errors.bonusType}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Bonus Amount (%)</label>
          <input
            type="number"
            value={formData.bonusAmount}
            onChange={(e) => handleInputChange("bonusAmount", e.target.value)}
            className={`rounded border p-2 text-sm ${errors.bonusAmount ? "border-red-500" : ""}`}
          />
          {errors.bonusAmount && (
            <p className="text-xs text-red-500">{errors.bonusAmount}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Minimum Add Amount ($)</label>
          <input
            type="number"
            value={formData.minimumAddAmount}
            onChange={(e) =>
              handleInputChange("minimumAddAmount", e.target.value)
            }
            className={`rounded border p-2 text-sm ${errors.minimumAddAmount ? "border-red-500" : ""}`}
          />
          {errors.minimumAddAmount && (
            <p className="text-xs text-red-500">{errors.minimumAddAmount}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Maximum Bonus ($)</label>
          <input
            type="number"
            value={formData.maximumBonus}
            onChange={(e) => handleInputChange("maximumBonus", e.target.value)}
            className={`rounded border p-2 text-sm ${errors.maximumBonus ? "border-red-500" : ""}`}
          />
          {errors.maximumBonus && (
            <p className="text-xs text-red-500">{errors.maximumBonus}</p>
          )}
        </div>
        <DatePicker
          label="Start Date"
          onChange={(value) => handleInputChange("startDate", value)}
          value={formData.startDate}
          error={errors.startDate}
        />
        <DatePicker
          label="End Date"
          onChange={(value) => handleInputChange("endDate", value)}
          value={formData.endDate}
          error={errors.endDate}
        />
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button className="rounded border p-2 text-sm" onClick={handleReset}>
          Reset
        </button>
        <button
          className="rounded bg-blue-600 p-2 text-sm text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
