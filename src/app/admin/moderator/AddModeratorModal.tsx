import { useCreateDeliveryMutation } from "@/redux/services/admin/adminCourierApis";
import {
  useCreateModeratorMutation,
  useUpdateModeratorAccessMutation,
} from "@/redux/services/admin/adminModeratorApis";
import { useUpdateOrderStatusMutation } from "@/redux/services/admin/adminOrderApis";
import { Modal } from "antd";
import { EmailAuthCredential } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const accessList = [
  "order-pending",
  "order-confirm",
  "order-packaging",
  "order-out-for-delivery",
  "order-delivered",
  "order-returned",
  "order-failed-to-deliver",
  "order-cancelled",
  "refund-pending",
  "refund-approved",
  "refund-refunded",
  "refund-rejected",
  "category",
  "sub-category",
  "sub-sub-category",
  "brand",
  "attribute",
  "product-list",
  "product-add",
  "sliders",
  "customer-list",
  "customer-review",
  "add-vendor",
  "vendor-list",
];

const AddModeratorModal = ({
  openAddModeratorModal,
  setOpenAddModeratorCourierModal,
  refetch,
  isEditable,
  setIsEditable,
}: {
  openAddModeratorModal: boolean;
  setOpenAddModeratorCourierModal: (value: boolean) => void;
  refetch: () => void;
  isEditable: {
    status: boolean;
    value: { id: number; moderator_access: { access: string }[] };
  };
  setIsEditable: ({
    status,
    value,
  }: {
    status: boolean;
    value: { id: number; moderator_access: { access: string }[] };
  }) => void;
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedAccessList, setSelectedAccessList] = useState<string[]>([]);
  const [confirmAddModeratorLoading, setConfirmAddModeratorLoading] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  console.log("isEditable", isEditable);

  console.log("selectedList", selectedAccessList);

  // redux hooks
  const [createModerator] = useCreateModeratorMutation();
  const [updateModeratorAccess] = useUpdateModeratorAccessMutation();

  useEffect(() => {
    const filteredList = Array.isArray(isEditable?.value?.moderator_access)
      ? isEditable.value.moderator_access
          .map((access: any) => access.access)
          .filter((ac: string) => ac)
      : [];
    setSelectedAccessList(filteredList);

    console.log("fil", filteredList);
  }, [isEditable]);

  const handleAddModeratorModalOk = async () => {
    setConfirmAddModeratorLoading(true);

    try {
      if (isEditable?.status) {
        // Prepare payload
        const payload = {
          accessList: selectedAccessList,
        };
        const id = isEditable?.status && isEditable?.value?.id;
        const res = await updateModeratorAccess({
          id: Number(id),
          data: payload,
        }).unwrap();
        toast.success(res?.message || "Successfully Update Moderator Access");
      } else {
        // Prepare payload
        const payload = {
          name: fullName,
          email: email,
          password,
          accessList: selectedAccessList,
        };
        const res = await createModerator(payload).unwrap();
        toast.success(res?.message || "Successfully Created Moderator");
      }
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setConfirmAddModeratorLoading(false);
      setOpenAddModeratorCourierModal(false);
      setIsEditable({
        status: false,
        value: { id: 0, moderator_access: [{ access: "" }] },
      });
    }
  };

  const handleAddModeratorModalCancel = () => {
    setOpenAddModeratorCourierModal(false);
    setIsEditable({
      status: false,
      value: { id: 0, moderator_access: [{ access: "" }] },
    });
  };

  return (
    <Modal
      title={`${isEditable?.status ? "Edit" : "Add New"} Moderator ${isEditable?.status ? "Access" : ""}`}
      open={openAddModeratorModal}
      onOk={handleAddModeratorModalOk}
      confirmLoading={confirmAddModeratorLoading}
      onCancel={handleAddModeratorModalCancel}
    >
      <div className="space-y-4">
        {!isEditable?.status && (
          <>
            {" "}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">
                Name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded border p-2 text-slate-900"
                type="text"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border p-2 text-slate-900"
                type="email"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border p-2 pr-10 text-slate-900"
                  type={showPassword ? "text" : "password"}
                  name=""
                  id=""
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Accessable Section
          </label>

          {/* Show selected items as tags */}
          <div className="mb-2 flex flex-wrap gap-2">
            {selectedAccessList.length === 0 ? (
              <span className="text-xs text-gray-500">No section selected</span>
            ) : (
              selectedAccessList.map((ac) => (
                <span
                  key={ac}
                  className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-xs"
                >
                  {ac}
                  <button
                    type="button"
                    className="ml-1 text-red-500 hover:text-red-700"
                    onClick={() =>
                      setSelectedAccessList(
                        selectedAccessList.filter((item) => item !== ac),
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Dropdown for picking one and pushing to array */}
          <select
            className="w-full rounded border p-2 text-slate-900"
            value=""
            onChange={(e) => {
              const selected = e.target.value;
              if (selected && !selectedAccessList.includes(selected)) {
                setSelectedAccessList([...selectedAccessList, selected]);
              }
              e.target.value = ""; // reset to placeholder
            }}
          >
            <option value="">Select Section</option>
            {accessList
              .filter((ac) => !selectedAccessList.includes(ac))
              .map((ac) => (
                <option className="capitalize" key={ac} value={ac}>
                  {ac}
                </option>
              ))}
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default AddModeratorModal;
