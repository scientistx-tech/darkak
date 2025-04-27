"use client";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";

import img from "@/Data/Demo/maintenance.png";

const UpdateNotice: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("update_notice_shown_date");
    const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD

    if (lastShown !== today) {
      setIsModalOpen(true);
      localStorage.setItem("update_notice_shown_date", today);
    }
  }, []);

  return (
    <Modal
      title="Notice"
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      okText="Got it!"
      footer={false}
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <Image src={img} alt="" className="w-[50%]" />
        <p>
          This site is currently under updating. Some features might be
          unavailable.
        </p>
      </div>
    </Modal>
  );
};

export default UpdateNotice;
