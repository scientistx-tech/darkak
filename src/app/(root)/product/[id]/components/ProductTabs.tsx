'use client';
import { useRef, RefObject } from 'react';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'specification', label: 'Specification' },
  { id: 'description', label: 'Description' },
  { id: 'warranty', label: 'Warranty' },
] as const;

type TabId = (typeof tabs)[number]['id'];

// Allow refs to possibly be null (which is always the case with useRef)
type SectionRefs = Record<TabId, RefObject<HTMLDivElement | null>>;

export const ProductTabs = () => {
  const sectionRefs: SectionRefs = {
    specification: useRef(null),
    description: useRef(null),
    warranty: useRef(null),
  };

  const scrollToSection = (id: TabId) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Tabs */}
      <div className=" flex gap-2 bg-secondaryWhite">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className={` ${"Specification" === tab.label ? 'bg-primaryBlue hover:bg-primaryDarkBlue text-white':''} text-primaryDarkBlue text-center py-2 rounded-md w-full hover:bg-primaryBlue hover:text-white`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className=" space-y-6">
        <motion.div
          ref={sectionRefs.specification}
          id="specification"
          className="bg-secondaryWhite p-4 shadow-secondaryBlue shadow-sm rounded-md min-h-[200px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold mb-2">Specification</h3>
          <p>CPU: Apple M3, RAM: 8GB, SSD: 256GB, GPU: 10-core</p>
        </motion.div>

        <motion.div
          ref={sectionRefs.description}
          id="description"
          className="bg-white p-4 shadow-secondaryBlue shadow-sm rounded-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="bg-primaryBlue text-white px-4 py-2 rounded-md mb-2 w-full">
            Description
          </h3>
          <p className="text-gray-700 font-semibold">
            MacBook Air M3 15-Inch 8GB/256GB 8 Core CPU 10 Core GPU
          </p>
          <p className="text-gray-600 mt-2">
            With a 60 percent performance boost compared to previous models...
          </p>
        </motion.div>

        <motion.div
          ref={sectionRefs.warranty}
          id="warranty"
          className="bg-primaryWhite p-4 shadow-secondaryBlue shadow-sm rounded-md min-h-[100px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="bg-primaryBlue text-white px-4 py-2 rounded-md mb-2 w-full">
          Warranty
          </h3>
          <p>1 Year Apple Limited Warranty. 90 days technical support.</p>
        </motion.div>
      </div>
    </div>
  );
};
