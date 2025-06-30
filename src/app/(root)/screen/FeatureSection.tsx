import ContentSection from "@/components/Layouts/root/ContentSection";
import Link from "next/link";
import React from "react";
import {
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCertificate,
  FaBuilding,
  FaComments,
  FaQuestionCircle,
  FaUserShield,
} from "react-icons/fa";
import FaqSection from "./FaqSection";

const topFeatures = [
  {
    icon: <FaTruck className="text-3xl text-primaryBlue" />,
    title: "Fast Delivery all across the country",
  },
  {
    icon: <FaShieldAlt className="text-3xl text-primaryBlue" />,
    title: "Safe Payment",
  },
  {
    icon: <FaUndo className="text-3xl text-primaryBlue" />,
    title: "7 Days Return Policy",
  },
  {
    icon: <FaCertificate className="text-3xl text-primaryBlue" />,
    title: "100% Authentic Products",
  },
];

const bottomLinks = [
  {
    icon: <FaBuilding className="mb-2 text-3xl text-primaryBlue" />,
    title: "About us",
    description: "Know about our company more.",
    href: "/about-us",
  },
  {
    icon: <FaComments className="mb-2 text-3xl text-primaryBlue" />,
    title: "Contact Us",
    description: "We are Here to Help",
    href: "/contact-us",
  },
  {
    icon: <FaQuestionCircle className="mb-2 text-3xl text-primaryBlue" />,
    title: "FAQ",
    description: "Get all Answers",
    href: "/faq",
  },
  {
    icon: <FaUserShield className="mb-2 text-3xl text-primaryBlue" />,
    title: "Privacy Policy",
    description: "Understand how we protect your data.",
    href: "/privacy-policy",
  },
];

const FeatureSection = () => {
  return (
    <section className="md:mt-10 mt-8 w-full">
      <ContentSection></ContentSection>
<FaqSection></FaqSection>
      {/* Top Features */}
      <div className="grid mt-10 grid-cols-1 gap-6 rounded-xl bg-blue-50 px-4 py-8 text-center md:grid-cols-2 lg:grid-cols-4">
        {topFeatures.map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
              {feature.icon}
            </div>
            <p className="text-sm font-medium text-gray-700">{feature.title}</p>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Cards */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {bottomLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href || "#"}
            className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-6 text-center transition-shadow hover:shadow-md"
          >
            {link.icon}
            <h3 className="text-base font-semibold text-gray-800">
              {link.title}
            </h3>
            <p className="text-sm text-gray-500">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
