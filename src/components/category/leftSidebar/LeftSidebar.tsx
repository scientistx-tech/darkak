"use client";

import React, { useState, useEffect } from "react";
import Price from "./Price";
import FilterRadioGroup from "@/components/category/leftSidebar/FilterRadioGroup";
import FilterRadioSearch from "@/components/category/leftSidebar/FilterRadioSearch";
import { IoIosArrowDown } from "react-icons/io";
import { useGetProductCategoriesQuery } from "@/redux/services/client/categories";
import { useGetBrandsPublicQuery } from "@/redux/services/client/brands";

const availabilityOptions = [
  { value: "in_stock", label: "In stock" },
  { value: "online_order", label: "Online Order" },
  { value: "pre_order", label: "Pre Order" },
];

const warrantyOptions = [
  { value: "official", label: "Official" },
  { value: "darkak", label: "Darkak" },
];

// const regionOptions = ["BD", "AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ"];

const regionOptions = [
  {
    label: "BD",
    value: "BD",
  },
  {
    label: "AF",
    value: "AF",
  },
  {
    label: "AL",
    value: "AL",
  },
  {
    label: "DZ",
    value: "DZ",
  },
  {
    label: "AS",
    value: "AS",
  },
  {
    label: "AD",
    value: "AD",
  },
  {
    label: "AO",
    value: "AO",
  },
  {
    label: "AI",
    value: "AI",
  },
  {
    label: "AQ",
    value: "AQ",
  },
];

// Add your nested categories data here or fetch from API

const LeftSidebar: React.FC<{ onFilterChange?: (params: any) => void }> = (
  props,
) => {
  const [availability, setAvailability] = useState("");
  const [warranty, setWarranty] = useState("darkak");
  const [region, setRegion] = useState("BD");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [open, setOpen] = useState<boolean>(true);
  // --- Brand Filter Section ---
  const [brandSearch, setBrandSearch] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);
  // Only one brand can be selected
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  // --- Price filter state ---
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");

  // redux hooks
  const { data: categoriesData } = useGetProductCategoriesQuery();
  const { data: brandsData } = useGetBrandsPublicQuery({ search: brandSearch });

  // Ref for auto-scroll to top of sidebar on filter change
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  // Helper: scroll to top of sidebar with margin (cross-browser, reliable)
  const scrollToSidebarWithOffset = () => {
    if (sidebarRef.current) {
      const rect = sidebarRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const offset = 60; // px, adjust as needed for your header height
      const top = rect.top + scrollTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Scroll to top of sidebar when any filter changes, with margin
  useEffect(() => {
    scrollToSidebarWithOffset();
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedSubSubCategory,
    selectedBrand,
    availability,
    warranty,
    region,
    lowPrice,
    highPrice,
  ]);

  const handleOpenClose = () => {
    setOpen((pre) => !pre);
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailability(e.target.value);
  };

  const handleChangeWarranty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarranty(e.target.value);
  };

  const handleChangeRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
  };

  // Collapsible category filter component
  const CollapsibleCategoryFilter = ({
    categories,
    selected,
    onSelect,
    onSelectSub,
    onSelectSubSub,
  }: any) => {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    // Always keep expanded if selected, or if previously expanded
    const isExpanded = (id: string, selectedId: string) => {
      return expanded[id] || selectedId === id;
    };

    const handleToggle = (id: string) => {
      setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
      <ul className="pl-0">
        {categories.map((cat: any) => (
          <li key={cat.id} className="mb-1">
            <div className="group flex items-center justify-between">
              <span
                className={`flex-1 cursor-pointer rounded px-2 py-1 transition hover:bg-blue-50 ${selected === cat.id ? "bg-blue-100 font-semibold text-blue-700" : ""}`}
                onClick={() => {
                  onSelect(cat.id);
                  if (onSelectSub) onSelectSub.set("");
                  if (onSelectSubSub) onSelectSubSub.set("");
                }}
              >
                {cat.title}
              </span>
              {cat.sub_category && cat.sub_category.length > 0 && (
                <button
                  className="ml-2 p-1 text-gray-500 hover:text-blue-600 focus:outline-none"
                  onClick={() => handleToggle(cat.id)}
                  aria-label={
                    isExpanded(cat.id, selected) ? "Collapse" : "Expand"
                  }
                  type="button"
                >
                  <span
                    className={`transition-transform ${isExpanded(cat.id, selected) ? "rotate-90" : ""}`}
                  >
                    ▶
                  </span>
                </button>
              )}
            </div>
            {cat.sub_category &&
              cat.sub_category.length > 0 &&
              isExpanded(cat.id, selected) && (
                <ul className="ml-4 border-l border-gray-200 pl-2">
                  {cat.sub_category.map((sub: any) => (
                    <li key={sub.id} className="mb-1">
                      <div className="group flex items-center justify-between">
                        <span
                          className={`flex-1 cursor-pointer rounded px-3 py-1 text-sm transition hover:bg-blue-50 ${onSelectSub && onSelectSub.selected === sub.id ? "border-l-4 border-blue-500 bg-blue-200 font-semibold text-blue-800" : ""}`}
                          style={{
                            background:
                              onSelectSub && onSelectSub.selected === sub.id
                                ? "#e0f2fe"
                                : undefined,
                          }}
                          onClick={() => {
                            if (onSelect) onSelect(cat.id); // select parent cat
                            onSelectSub && onSelectSub.set(sub.id);
                            if (onSelectSubSub) onSelectSubSub.set("");
                          }}
                        >
                          {sub.title}
                        </span>
                        {sub.sub_sub_category &&
                          sub.sub_sub_category.length > 0 && (
                            <button
                              className="ml-2 mt-2 p-1 text-gray-500 hover:text-blue-600 focus:outline-none"
                              onClick={() => handleToggle(sub.id)}
                              aria-label={
                                isExpanded(sub.id, onSelectSub.selected)
                                  ? "Collapse"
                                  : "Expand"
                              }
                              type="button"
                            >
                              <span
                                className={`transition-transform ${isExpanded(sub.id, onSelectSub.selected) ? "rotate-90" : ""}`}
                              >
                                ▶
                              </span>
                            </button>
                          )}
                      </div>
                      {sub.sub_sub_category &&
                        sub.sub_sub_category.length > 0 &&
                        isExpanded(sub.id, onSelectSub.selected) && (
                          <ul className="ml-4 border-l border-blue-100 pl-2">
                            {sub.sub_sub_category.map((subsub: any) => (
                              <li key={subsub.id}>
                                <span
                                  className={`cursor-pointer rounded px-4 py-1 text-xs transition hover:bg-blue-50 ${onSelectSubSub && onSelectSubSub.selected === subsub.id ? "border-l-4 border-blue-600 bg-blue-300 font-semibold text-blue-900" : ""}`}
                                  style={{
                                    background:
                                      onSelectSubSub &&
                                      onSelectSubSub.selected === subsub.id
                                        ? "#bae6fd"
                                        : undefined,
                                  }}
                                  onClick={() => {
                                    if (onSelect) onSelect(cat.id); // select parent cat
                                    if (onSelectSub) onSelectSub.set(sub.id); // select parent subcat
                                    onSelectSubSub &&
                                      onSelectSubSub.set(subsub.id);
                                  }}
                                >
                                  {subsub.title}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    );
  };

  // Filter brands by search
  const filteredBrands = Array.isArray(brandsData?.data)
    ? brandsData.data.filter((brand: any) =>
        brand.title.toLowerCase().includes(brandSearch.toLowerCase()),
      )
    : [];
  const visibleBrands = showAllBrands
    ? filteredBrands
    : filteredBrands.slice(0, 10);

  const handleBrandCheck = (id: string) => {
    setSelectedBrand(id === selectedBrand ? "" : id);
  };

  // --- Filter state aggregation for parent ---
  useEffect(() => {
    // Compose all filter values into a single object
    const queryParams = {
      categoryId: selectedCategory,
      subCategoryId: selectedSubCategory,
      subSubCategoryId: selectedSubSubCategory,
      brandId: selectedBrand,
      availability,
      warranty,
      region,
      lowPrice: lowPrice === "" ? undefined : Number(lowPrice),
      highPrice: highPrice === "" ? undefined : Number(highPrice),
      // Add more if needed
    };

    // Remove keys with empty string, undefined, or NaN
    const filteredParams: Record<string, any> = {};
    Object.entries(queryParams).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== "" &&
        !(typeof value === "number" && isNaN(value))
      ) {
        filteredParams[key] = value;
      }
    });

    if (
      typeof window !== "undefined" &&
      typeof props?.onFilterChange === "function"
    ) {
      props.onFilterChange(filteredParams);
    }
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedSubSubCategory,
    selectedBrand,
    availability,
    warranty,
    region,
    lowPrice,
    highPrice,
  ]);

  return (
    <div ref={sidebarRef} className="flex flex-col gap-y-6">
      <Price
        onPriceChange={({ lowPrice, highPrice }) => {
          setLowPrice(lowPrice);
          setHighPrice(highPrice);
        }}
      />

      {/* category */}
      <div className="rounded bg-blue-100 p-3">
        <div className={`mb-3 flex items-center justify-between`}>
          <h2 className="text-lg font-semibold text-blue-900">Category</h2>
          <div className="flex items-center gap-2">
            {(selectedCategory ||
              selectedSubCategory ||
              selectedSubSubCategory) && (
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedSubCategory("");
                  setSelectedSubSubCategory("");
                }}
                className="rounded border border-blue-300 bg-blue-200 px-2 py-1 text-xs font-medium text-blue-900 hover:bg-blue-300"
                type="button"
                title="Clear category filter"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleOpenClose}
              className="flex size-[30px] items-center justify-center rounded-full bg-[#003084]"
            >
              <IoIosArrowDown
                size={20}
                color="white"
                className={`${open ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
        {open && (
          <CollapsibleCategoryFilter
            categories={categoriesData ? categoriesData : []}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            onSelectSub={{
              selected: selectedSubCategory,
              set: setSelectedSubCategory,
            }}
            onSelectSubSub={{
              selected: selectedSubSubCategory,
              set: setSelectedSubSubCategory,
            }}
          />
        )}
      </div>
      {/* Brand Filter */}
      <div className="rounded bg-blue-100 p-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-blue-900">Brand</h2>
        </div>
        <input
          type="text"
          placeholder="Search brand..."
          className="mb-2 w-full rounded border px-2 py-1 text-sm focus:outline-none"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
        />
        <div className="hide-scrollbar max-h-56 overflow-y-auto pr-1">
          {/* All option for clearing brand filter */}
          <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 font-semibold text-blue-900 hover:bg-blue-50">
            <input
              type="radio"
              name="brand-filter"
              checked={selectedBrand === ""}
              onChange={() => setSelectedBrand("")}
              className="accent-blue-600"
            />
            <span className="truncate text-sm">All</span>
          </label>
          {visibleBrands.length === 0 && (
            <div className="py-2 text-sm text-gray-400">No brands found</div>
          )}
          {visibleBrands.map((brand: any) => (
            <label
              key={brand.id}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-blue-50"
            >
              <input
                type="radio"
                name="brand-filter"
                checked={selectedBrand === brand.id}
                onChange={() => handleBrandCheck(brand.id)}
                className="accent-blue-600"
              />
              {/* Brand logo if available */}
              {brand.image && (
                <img
                  src={brand.image}
                  alt={brand.title}
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                />
              )}
              <span className="truncate text-sm">{brand.title}</span>
            </label>
          ))}
        </div>
        {filteredBrands.length > 10 && (
          <button
            className="mt-2 w-full rounded bg-blue-200 py-1 text-xs font-medium text-blue-900 hover:bg-blue-300"
            onClick={() => setShowAllBrands((v) => !v)}
            type="button"
          >
            {showAllBrands
              ? "Show less"
              : `Show all (${filteredBrands.length})`}
          </button>
        )}
      </div>
      <FilterRadioGroup
        title="Availability"
        name="availability"
        options={availabilityOptions}
        selected={availability}
        onChange={handleAvailabilityChange}
      />
      <FilterRadioGroup
        title="Warranty"
        name="warranty"
        options={warrantyOptions}
        selected={warranty}
        onChange={handleChangeWarranty}
      />
      <FilterRadioSearch
        title="Region"
        name="region"
        options={regionOptions}
        selected={region}
        onChange={handleChangeRegion}
        // showSeeMore={true}
        // onSeeMore={() => alert("Load more storage options")}
      />
    </div>
  );
};

export default LeftSidebar;
