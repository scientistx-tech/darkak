import React, { useEffect, useState } from "react";
import { Modal, Radio, Spin } from "antd";

interface ShippingModalProps {
  shippingData: {
    shipping_fee_format: string;
    company: string;
    min_delivery_days: string;
  }[];
  setShippingFee: (value: number) => void;
}

const ShippingModal: React.FC<ShippingModalProps> = ({
  shippingData,
  setShippingFee,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Simulate loading delay for effect
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (index: string) => {
    setSelected(index);
    const selectedService = shippingData[parseInt(index)];

    if (selectedService) {
      const numericFee = parseFloat(
        selectedService.shipping_fee_format.replace(/[^\d.]/g, ""),
      );
      setShippingFee(numericFee);
      setIsModalOpen(false);
      console.log("Selected Shipping Option:", selectedService);
    }
  };

  return (
    <Modal
      title="Select a Shipping Service"
      open={isModalOpen}
      footer={null}
      closable={false}
      maskClosable={false}
    >
      {loading ? (
        <div className="flex justify-center py-6">
          <Spin tip="Loading shipping options..." />
        </div>
      ) : (
        <Radio.Group
          onChange={(e) => handleSelect(e.target.value)}
          value={selected}
          style={{ width: "100%" }}
        >
          {shippingData?.map((service, index) => (
            <Radio
              key={index}
              value={index.toString()}
              style={{
                display: "block",
                padding: "10px 12px",
                marginBottom: "10px",
                border: "1px solid #e5e5e5",
                borderRadius: "6px",
                backgroundColor: "#fafafa",
                cursor: "pointer",
              }}
            >
              <div>
                <strong>{service.company}</strong>
                <div style={{ fontSize: "13px", color: "#555" }}>
                  Estimated Delivery: {service.min_delivery_days} days
                  <br />
                  <p className="text-lg font-semibold text-green-500">
                    {" "}
                    Fee: BDT {service.shipping_fee_format.split("T")[1]}
                  </p>
                </div>
              </div>
            </Radio>
          ))}
        </Radio.Group>
      )}
    </Modal>
  );
};

export default ShippingModal;
