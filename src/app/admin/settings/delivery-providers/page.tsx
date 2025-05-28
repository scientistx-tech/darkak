"use client";
import {
  useCreateDeliveryProviderMutation,
  useDeleteCourierMutation,
  useGetAllCourierQuery,
  useUpdateDeliveryProviderStatusMutation,
} from "@/redux/services/admin/adminCourierApis";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const maskValue = (value: string) => {
  if (value.length <= 4) return "*".repeat(value.length);
  return value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2);
};

const Page = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [showClientId, setShowClientId] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [storeId, setStoreId] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<{
    id: number;
    value: {
      title: string;
      type: string;
      email: string;
      password: string;
      isActive: boolean;
      base_url: string;
      client_id: string;
      client_secret: string;
      store_id: string;
    };
  }>({
    id: 0,
    value: {
      title: "",
      type: "",
      email: "",
      password: "",
      isActive: false,
      base_url: "",
      client_id: "",
      client_secret: "",
      store_id: "",
    },
  });
  const [isEditMode, setIsEditMode] = useState<{
    status: boolean;
    value: {
      title: string;
      type: string;
      email: string;
      password: string;
      isActive: boolean;
      base_url: string;
      client_id: string;
      client_secret: string;
      store_id: string;
    };
  }>({
    status: false,
    value: {
      title: "",
      type: "",
      email: "",
      password: "",
      isActive: false,
      base_url: "",
      client_id: "",
      client_secret: "",
      store_id: "",
    },
  });

  const { data, isLoading, error, refetch } = useGetAllCourierQuery({});
  const [createDeliveryProvider, { isLoading: loadingCreate }] =
    useCreateDeliveryProviderMutation();
  const [deleteDeliveryProvider] = useDeleteCourierMutation();
  const [updateStatus] = useUpdateDeliveryProviderStatusMutation();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    // setModalText("The modal will be closed after two seconds");
    const payload = {
      title,
      email,
      password,
      client_id: clientId,
      client_secret: clientSecret,
      base_url: baseUrl,
      store_id: storeId,
      type,
    };

    try {
      setConfirmLoading(true);
      const res = await createDeliveryProvider(payload).unwrap();
      toast.success(res?.message || "Successfully created provider");
      refetch();
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || " Failed to create Provider");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      setSelectedProvider({
        id: data?.data[0]?.id,
        value: data?.data[0],
      });
    }
  }, [data]);

  // useEffect(() => {
  //   if (isEditMode.value) {
  //     setTitle(isEditMode.value.title || "");
  //     setEmail(isEditMode.value.email || "");
  //     setPassword(isEditMode.value.password || "");
  //     setClientId(isEditMode.value.client_id || "");
  //     setClientSecret(isEditMode.value.client_secret || "");
  //     setBaseUrl(isEditMode.value.base_url || "");
  //     setStoreId(isEditMode.value.store_id || "");
  //     setType(isEditMode.value.type || "");
  //   }
  // }, [isEditMode]);

  console.log("prov", selectedProvider);
  return (
    <div className="text-slate-900">
      <h2 className="text-2xl font-bold">Delivery Providers</h2>
      <p> Configure and manage delivery service providers</p>

      <div className="mt-10">
        {/* heading and add button */}
        <div className="flex items-center justify-between">
          <p className="text-lg">Delivery Providers</p>
          <button
            onClick={showModal}
            className="rounded-md bg-blue-950 px-6 py-2 font-bold text-white transition-all duration-300 ease-in-out hover:bg-blue-800"
          >
            Add Provider
          </button>
        </div>

        {/* providers list and details */}
        <div className="mt-8">
          <div className="flex gap-4">
            {/* providers list */}
            <div className="w-[30%] cursor-pointer border-2 border-slate-700 p-4 shadow-md">
              <p>Available Providers</p>
              {data?.data?.length <= 0 ? (
                <div className="py-10 font-bold text-red-500">
                  No provider added
                </div>
              ) : (
                data?.data?.map((provider: any, i: number) => (
                  <div
                    onClick={() =>
                      setSelectedProvider({ id: provider?.id, value: provider })
                    }
                    key={i}
                    className={`mt-5 rounded-sm p-2 ${selectedProvider?.id === provider?.id && "bg-gray-3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-green-600" />
                      <p className="font-bold capitalize">{provider?.type}</p>
                    </div>
                    <p className="my-2 text-xs">{provider?.title}</p>
                  </div>
                ))
              )}
            </div>
            {/* provider details */}
            {selectedProvider.id && (
              <div className="w-[70%] border border-slate-700 p-4">
                <p>Provider Details</p>
                {/* basic info */}
                <div className="mt-5">
                  <p className="font-bold text-slate-950">Basic Information</p>
                  <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Name</p>
                      <p>{selectedProvider?.value?.title}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Type</p>
                      <p className="capitalize">
                        {selectedProvider?.value?.type}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">Status</p>
                        {selectedProvider?.value?.isActive ? (
                          <p className="font-semibold text-green-500">Active</p>
                        ) : (
                          <p className="font-semibold text-red-500">Inactive</p>
                        )}
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            const res = await updateStatus(
                              selectedProvider?.id,
                            ).unwrap();
                            toast.success(
                              res?.message || "Successfully updated status",
                            );
                            refetch();
                          } catch (error: any) {
                            toast.error(
                              error?.data?.message || "Failed to update status",
                            );
                          }
                        }}
                        className="rounded-sm bg-yellow-50 p-0.5 text-xs text-yellow-700"
                      >
                        Change Status
                      </button>
                    </div>
                  </div>
                </div>
                {/* api creds */}
                <div className="mt-5">
                  <p className="font-bold text-slate-950">API Credentials</p>
                  <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Base Url</p>
                      <p>{selectedProvider?.value?.base_url}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Client Id</p>
                      <div className="flex items-center gap-2">
                        <p>
                          {showClientId
                            ? selectedProvider?.value?.client_id
                            : maskValue(
                                selectedProvider?.value?.client_id || "",
                              )}
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowClientId((prev) => !prev)}
                          className="text-blue-600"
                          tabIndex={-1}
                        >
                          {showClientId ? "🙈" : "👁️"}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Client Secret</p>
                      <div className="flex items-center gap-2">
                        <p>
                          {showClientSecret
                            ? selectedProvider?.value?.client_secret
                            : maskValue(
                                selectedProvider?.value?.client_secret || "",
                              )}
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowClientSecret((prev) => !prev)}
                          className="text-blue-600"
                          tabIndex={-1}
                        >
                          {showClientSecret ? "🙈" : "👁️"}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">User name</p>
                      <p>{selectedProvider?.value?.email}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Password</p>
                      <div className="flex items-center gap-2">
                        <p>
                          {showPassword
                            ? selectedProvider?.value?.password
                            : maskValue(
                                selectedProvider?.value?.password || "",
                              )}
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="text-blue-600"
                          tabIndex={-1}
                        >
                          {showPassword ? "🙈" : "👁️"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* configuration */}
                <div className="mt-5">
                  <p className="font-bold text-slate-950">Configuration</p>
                  <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Store Id</p>
                      <p>{selectedProvider?.value?.store_id}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Default Delivery Type</p>
                      <p>Regular (38)</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Default Item Type</p>
                      <p>Parcel</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Default Weight</p>
                      <p>0.5</p>
                    </div>
                  </div>
                </div>

                {/* buttons */}
                <div className="mt-5 flex items-center gap-4">
                  <button
                    // onClick={() => {
                    //   setIsEditMode({
                    //     status: true,
                    //     value: selectedProvider.value,
                    //   });
                    //   showModal();
                    // }}
                    className="rounded-md border-2 border-blue-800 bg-blue-100 px-12 py-2 text-blue-800 hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteDeliveryProvider(selectedProvider?.id).unwrap();
                      refetch();
                    }}
                    className="rounded-md border-2 border-red-800 bg-red-100 px-12 py-2 text-red-800 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            <div></div>
          </div>
        </div>
      </div>

      <Modal
        title={isEditMode?.status ? "Edit Provider" : "Add Provider"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="my-5 grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="w-full">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-slate-700 p-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="title">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-700 p-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="title">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-700 p-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="title">Base Url</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full rounded-md border border-slate-700 p-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="title">Client Id</label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded-md border border-slate-700 p-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="title">Client Secret</label>
            <input
              type="text"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              className="w-full rounded-md border border-slate-700 p-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="title">Store Id</label>
            <input
              type="text"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              className="w-full rounded-md border border-slate-700 p-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="title">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-md border border-slate-700 p-3"
            >
              <option value="">Select Courier Type</option>
              <option value="pathao">Pathao</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
