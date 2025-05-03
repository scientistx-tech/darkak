// components/SocialButton.tsx
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const SocialButton: React.FC = () => {
  return (
    <div className="my-4 flex justify-center gap-4">
      {[FaGoogle].map((Icon, index) => (
        <button
          key={index}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5694FF] text-white transition hover:bg-[#003084]"
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
};

export default SocialButton;
