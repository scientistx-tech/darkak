"use client";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import bannerImg from "@/Data/Demo/Elegant Grand Opening Announcement Invitation Banner Landscape.png"; // Update path if needed

const EidOfferNotice: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("eid_offer_shown_date");
    const today = new Date().toISOString().split("T")[0];
    if (lastShown !== today) {
      setIsModalOpen(true);
      localStorage.setItem("eid_offer_shown_date", today);
    }
  }, []);

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      closable={false}
      width={700}
      className="rounded-3xl modal-glow"
    >
      <div className="relative bg-gradient-to-br from-[#1f005c] via-[#5b0060] to-[#870160] text-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-stars opacity-10 pointer-events-none" />

        <div className="text-center px-6 py-10 relative z-10">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            🐐 Eid ul Adha Offer 🐐
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl mt-4 font-semibold text-white drop-shadow"
          >
            Celebrate with <span className="text-yellow-300 font-bold">Darkak Mart</span>
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mt-2 text-gray-200"
          >
            Special Discount: <span className="text-yellow-400 font-bold">30% Off</span> on all orders!
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg mt-4 text-green-300 font-semibold"
          >
            🕌 Limited Time Only — Grab it before Eid ends!
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="my-6"
          >
            <Image
              src={bannerImg}
              alt="Eid ul Adha Offer"
              className="rounded-2xl mx-auto border-4 border-yellow-400 shadow-lg"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(false)}
            className="mt-6 px-8 py-3 text-lg font-bold rounded-full bg-white text-[#870160] hover:bg-primaryBlue hover:text-white transition-all shadow-xl"
          >
            Shop Now!
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default EidOfferNotice;
