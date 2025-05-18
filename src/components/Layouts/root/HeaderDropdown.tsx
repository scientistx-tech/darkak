import React from "react";
import NavLink from "@/components/shared/NavLink";
import { hoverInfo } from "./data/Headerdata";

export default function HeaderDropdown() {
  return (
    <div className="relative">
      <div className="group/bouton relative">
        {/* Trigger */}
        <div className="flex cursor-pointer items-center gap-1 py-3">
          <p className="text-white group-hover/bouton:text-primary">Category</p>
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rotate-90 text-white transition-transform duration-300 group-hover/bouton:-rotate-90 group-hover/bouton:text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5L15.75 12 8.25 19.5"
              />
            </svg>
          </span>
        </div>

        {/* Dropdown Content */}
        <div className="absolute left-0 top-full z-10 hidden w-max origin-top scale-y-0 transform grid-cols-3 gap-6 bg-white p-4 opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover/bouton:grid group-hover/bouton:scale-y-100 group-hover/bouton:opacity-100">
          {hoverInfo.map((section, index) => (
            <div
              key={index}
              className="flex min-w-[180px] flex-col items-center justify-center gap-2"
            >
              <h3 className="text-lg font-semibold text-black">
                {section.category}
              </h3>
              {section.items.map((item, idx) => (
                <NavLink
                  key={idx}
                  href={item.path}
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          ))}

          <div className="col-span-3 mt-2 flex items-center justify-between border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-black">
              More Categories
            </h3>
            <NavLink
              href="/more"
              className="text-blue-600 transition-colors hover:text-blue-800"
            >
              View All
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
