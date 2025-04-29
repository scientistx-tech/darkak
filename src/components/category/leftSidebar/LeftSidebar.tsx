"use client";

import React, { useState } from "react";
import Price from "./Price";
import FilterRadioGroup from "@/components/category/leftSidebar/FilterRadioGroup";
import FilterRadioSearch from "@/components/category/leftSidebar/FilterRadioSearch";

const availabilityOptions = [
  { value: "in_stock", label: "In stock" },
  { value: "online_order", label: "Online Order" },
  { value: "pre_order", label: "Pre Order" },
];

const warrantyOptions = [{ value: "official", label: "Official" }];

const storageOptions = [
  { value: "12_1tb", label: "12 GB/1 TB" },
  { value: "12_256", label: "12 GB/256 GB" },
  { value: "12_512", label: "12 GB/512 GB" },
  { value: "8_128", label: "8 GB/128 GB" },
  { value: "4_64", label: "4 GB/64 GB" },
  { value: "3_32", label: "3 GB/32 GB" },
];

const typeOptions = [
  { label: "4G", value: "4g" },
  { label: "Active", value: "active" },
  { label: "Exynos 5G", value: "exynos-5g" },
  { label: "Inactive", value: "inactive" },
  { label: "Nano-Texture glass", value: "nano-texture-glass" },
];

const simOptions = [
  { label: "Dual", value: "dual" },
  { label: "LTE", value: "lte" },
  { label: "Single", value: "single" },
  { label: "Wifi", value: "wifi" },
  { label: "Wifi + Cell", value: "wifiCell" },
];

const regionOptions = [
  { label: "BD Official", value: "bd_official" },
  { label: "CN", value: "cn" },
  { label: "HK", value: "hk" },
  { label: "IND", value: "ind" },
  { label: "INT", value: "int" },
];

const networkOptions = [
  { label: "LTE", value: "lte" },
  { label: "Wifi", value: "wifi" },
  { label: "Wifi + Cell", value: "wifiCell" },
  { label: "IND", value: "ind" },
  { label: "INT", value: "int" },
];

const LeftSidebar: React.FC = () => {
  const [availability, setAvailability] = useState("in_stock");
  const [selected, setSelected] = useState("12_1tb");
  const [selectedType, setSelectedType] = useState("4g");
  const [warranty, setWarranty] = useState("official");
  const [sim, setSim] = useState("dual");
  const [region, setRegion] = useState("bd_official");
  const [network, setNetwork] = useState("lte");

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailability(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(e.target.value);
  };

  const handleChangeWarranty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarranty(e.target.value);
  };

  const handleChangeSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSim(e.target.value);
  };

  const handleChangeRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
  };

  const handleChangeNetwork = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNetwork(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <Price />
      <FilterRadioGroup
        title="Availability"
        name="availability"
        options={availabilityOptions}
        selected={availability}
        onChange={handleAvailabilityChange}
      />
      <FilterRadioSearch
        title="Storage"
        name="storage"
        options={storageOptions}
        selected={selected}
        onChange={handleChange}
        showSeeMore={true}
        onSeeMore={() => alert("Load more storage options")}
      />
      <FilterRadioSearch
        title="Type"
        name="type"
        options={typeOptions}
        selected={selectedType}
        onChange={handleChangeType}
        showSeeMore={true}
        onSeeMore={() => alert("Load more storage options")}
      />
      <FilterRadioGroup
        title="Warranty"
        name="warranty"
        options={warrantyOptions}
        selected={warranty}
        onChange={handleChangeWarranty}
      />
      <FilterRadioSearch
        title="Sim"
        name="sim"
        options={simOptions}
        selected={sim}
        onChange={handleChangeSim}
        showSeeMore={true}
        onSeeMore={() => alert("Load more storage options")}
      />
      <FilterRadioSearch
        title="Region"
        name="region"
        options={regionOptions}
        selected={region}
        onChange={handleChangeRegion}
        showSeeMore={true}
        onSeeMore={() => alert("Load more storage options")}
      />
      <FilterRadioSearch
        title="Network"
        name="network"
        options={networkOptions}
        selected={network}
        onChange={handleChangeNetwork}
        showSeeMore={true}
        onSeeMore={() => alert("Load more storage options")}
      />
    </div>
  );
};

export default LeftSidebar;
