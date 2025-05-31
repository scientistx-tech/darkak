import { useCreateDeliveryMutation } from "@/redux/services/admin/adminCourierApis";
import { useCreateModeratorMutation } from "@/redux/services/admin/adminModeratorApis";
import { useUpdateOrderStatusMutation } from "@/redux/services/admin/adminOrderApis";
import { Modal } from "antd";
import { EmailAuthCredential } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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
}: {
  openAddModeratorModal: boolean;
  setOpenAddModeratorCourierModal: (value: boolean) => void;
  refetch: () => void;
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedAccessList, setSelectedAccessList] = useState<string[]>([]);
  const [confirmAddModeratorLoading, setConfirmAddModeratorLoading] =
    useState<boolean>(false);

  const token = useSelector((state: any) => state.auth.token);

  // redux hooks
  const [createModerator] = useCreateModeratorMutation();

  const handleAddModeratorModalOk = async () => {
    // Validation

    setConfirmAddModeratorLoading(true);

    // Prepare payload
    const payload = {
      name: fullName,
      email: email,
      password,
      accessList: selectedAccessList,
    };

    try {
      const res = await createModerator(payload).unwrap();
      toast.success(res?.message || "Successfully Created Moderator");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setConfirmAddModeratorLoading(false);
      setOpenAddModeratorCourierModal(false);
    }
  };

  const handleAddModeratorModalCancel = () => {
    setOpenAddModeratorCourierModal(false);
  };

  return (
    <Modal
      title={`Add New Moderator`}
      open={openAddModeratorModal}
      onOk={handleAddModeratorModalOk}
      confirmLoading={confirmAddModeratorLoading}
      onCancel={handleAddModeratorModalCancel}
    >
      <div className="space-y-4">
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
            type="text"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2 text-slate-900"
            type="text"
            name=""
            id=""
          />
        </div>

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
