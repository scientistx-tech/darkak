import { useCreateDeliveryMutation } from "@/redux/services/admin/adminCourierApis";
import { useUpdateOrderStatusMutation } from "@/redux/services/admin/adminOrderApis";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CourierModal = ({
  orderDetails,
  openCourierModal,
  setOpenCourierModal,
  refetch,
  selectedCourierMedium,
}: {
  orderDetails: any;
  openCourierModal: boolean;
  setOpenCourierModal: (value: boolean) => void;
  refetch: () => void;
  selectedCourierMedium: string;
}) => {
  const [deliveryType, setDeliveryType] = useState("express");
  const [itemType, setItemType] = useState("parcel");
  const [specialInstruction, setSpecialInstruction] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemWeight, setItemWeight] = useState(1);
  const [itemDescription, setItemDescription] = useState("");
  const [amountToCollect, setAmountToCollect] = useState(0);
  const [cityId, setCityId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [confirmCourierLoading, setConfirmCourierLoading] = useState(false);

  const [cities, setCities] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [zonesLoading, setZonesLoading] = useState(false);
  const [areasLoading, setAreasLoading] = useState(false);

  const [createDelivery] = useCreateDeliveryMutation();
  const [changeOrderStatus] = useUpdateOrderStatusMutation();
  const token = useSelector((state: any) => state.auth.token);

  // Fetch cities on mount
  useEffect(() => {
    if (orderDetails?.id) {
      fetch(`https://api.darkak.com.bd/api/admin/courier/cities/4`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Replace with your API endpoint
        .then((res) => res.json())
        .then((data) => {
          if (data?.code === 200) {
            setCities(data?.data?.data);
          } else {
            toast.error("Failed to load Cities from Pathao Api");
          }
        });
    }
  }, [orderDetails]);
  // Fetch zones when city changes
  useEffect(() => {
    if (cityId) {
      setZonesLoading(true);
      fetch(`https://api.darkak.com.bd/api/admin/courier/zones/4/${cityId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Replace with your API endpoint
        .then((res) => res.json())
        .then((data) => setZones(data?.data?.data))
        .finally(() => setZonesLoading(false));
    } else {
      setZones([]);
      setZoneId("");
      setAreas([]);
      setAreaId("");
      setZonesLoading(false);
    }
  }, [cityId]);

  // Fetch areas when zone changes
  useEffect(() => {
    if (zoneId) {
      setAreasLoading(true);
      fetch(`https://api.darkak.com.bd/api/admin/courier/area/4/${zoneId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Replace with your API endpoint
        .then((res) => res.json())
        .then((data) => setAreas(data?.data?.data))
        .finally(() => setAreasLoading(false));
    } else {
      setAreas([]);
      setAreaId("");
      setAreasLoading(false);
    }
  }, [zoneId]);

  const handleCourierModalOk = async () => {
    // Validation
    if (!deliveryType) {
      toast.error("Please select delivery type.");
      return;
    }
    if (!itemType) {
      toast.error("Please select item type.");
      return;
    }

    if (!itemQuantity || itemQuantity < 1) {
      toast.error("Item quantity must be at least 1.");
      return;
    }
    if (!itemWeight || itemWeight <= 0) {
      toast.error("Item weight must be greater than 0.");
      return;
    }

    if (!amountToCollect || amountToCollect < 0) {
      toast.error("Amount to collect must be 0 or more.");
      return;
    }
    if (!cityId) {
      toast.error("Please select a city.");
      return;
    }
    if (!zoneId) {
      toast.error("Please select a zone.");
      return;
    }
    if (!areaId) {
      toast.error("Please select an area.");
      return;
    }

    setConfirmCourierLoading(true);

    // Prepare payload
    const payload = {
      delivery_type: deliveryType,
      item_type: itemType,
      special_instruction: specialInstruction,
      item_quantity: itemQuantity,
      item_weight: itemWeight,
      item_description: itemDescription,
      amount_to_collect: amountToCollect,
      cityId: Number(cityId),
      zoneId: Number(zoneId),
      areaId: Number(areaId),
    };

    try {
      const res = await createDelivery({
        id: orderDetails?.id,
        data: payload,
      }).unwrap();
      toast.success(res?.message || "Courier info submitted!");
      setOpenCourierModal(false);
      if (res) {
        changeOrderStatus({
          id: orderDetails?.id,
          data: { status: "out_for_delivery" },
        })
          .unwrap()
          .then(() => {
            refetch();
            toast.success("Order status updated!");
          })
          .catch(() => {
            toast.error("Failed to update order status");
          });
      }
    } catch (error) {
      toast.error("Failed to submit courier info.");
    } finally {
      setConfirmCourierLoading(false);
    }
  };

  const handleCourierModalCancel = () => {
    setOpenCourierModal(false);
  };

  return (
    <Modal
      title={`Ready for ${selectedCourierMedium.toLocaleUpperCase()} Courier`}
      open={openCourierModal}
      onOk={handleCourierModalOk}
      confirmLoading={confirmCourierLoading}
      onCancel={handleCourierModalCancel}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Delivery Type
          </label>
          <select
            className="w-full rounded border p-2 text-slate-900"
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="express">Express</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Item Type
          </label>
          <select
            className="w-full rounded border p-2 text-slate-900"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
          >
            <option value="parcel">Parcel</option>
            <option value="document">Document</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Special Instruction
          </label>
          <input
            type="text"
            className="w-full rounded border p-2 text-slate-900"
            value={specialInstruction}
            onChange={(e) => setSpecialInstruction(e.target.value)}
            placeholder="Handle with care, fragile item."
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-900">
              Item Quantity
            </label>
            <input
              type="number"
              min={1}
              className="w-full rounded border p-2 text-slate-900"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-900">
              Item Weight (kg)
            </label>
            <input
              type="number"
              min={0}
              step={0.01}
              className="w-full rounded border p-2 text-slate-900"
              value={itemWeight}
              onChange={(e) => setItemWeight(Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Item Description
          </label>
          <input
            type="text"
            className="w-full rounded border p-2 text-slate-900"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Describe the item"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Amount to Collect
          </label>
          <input
            type="number"
            min={0}
            className="w-full rounded border p-2 text-slate-900"
            value={amountToCollect}
            onChange={(e) => setAmountToCollect(Number(e.target.value))}
            placeholder="Amount"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            City
          </label>
          <select
            className="w-full rounded border p-2 text-slate-900"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
          >
            <option value="">Select City</option>
            {cities?.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Zone
          </label>
          <select
            className="w-full rounded border p-2 text-slate-900"
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
            disabled={!cityId}
          >
            <option value="">Select Zone</option>
            {zonesLoading ? (
              <option disabled>Loading...</option>
            ) : (
              zones?.map((zone) => (
                <option key={zone.zone_id} value={zone.zone_id}>
                  {zone.zone_name}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Area
          </label>
          <select
            className="w-full rounded border p-2 text-slate-900"
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            disabled={!zoneId}
          >
            <option value="">Select Area</option>
            {areasLoading ? (
              <option disabled>Loading...</option>
            ) : (
              areas?.map((area) => (
                <option key={area.area_id} value={area.area_id}>
                  {area.area_name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default CourierModal;
