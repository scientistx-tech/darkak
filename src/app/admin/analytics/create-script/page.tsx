"use client";
import React, { useState } from "react";

import * as Switch from "@radix-ui/react-switch";
import { useCreateScriptMutation } from "@/redux/services/admin/adminScripts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ANALYTICS_TYPES = [
  { label: "Custom", value: "custom" },
  { label: "Facebook Pixels", value: "facebook_pixels" },
  { label: "Google Analytics", value: "google_analytics" },
];

const LOCATIONS = [
  { label: "Head", value: "header" },
  { label: "Body Start", value: "body-top" },
  { label: "Body End", value: "body-bottom" },
];
const Page = () => {
  const [form, setForm] = useState({
    name: "",
    type: "custom",
    location: "header",
    script: "",
    active: true,
  });
  const [createScript, { isLoading }] = useCreateScriptMutation();

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitch = (checked: boolean) => {
    setForm((prev) => ({ ...prev, active: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createScript(form)
      .unwrap()
      .then(() => {
        toast.success("Script created successfully");
        setForm({
          name: "",
          type: "custom",
          location: "head",
          script: "",
          active: true,
        });
        router.push("/admin/analytics");
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Failed to create script");
        console.error("Failed to create script:", error);
      });
    // Optionally reset form or show notification
  };
  return (
    <div className="text-slate-950">
      <h1 className="text-2xl font-bold">Add Analytics Script</h1>
      <form
        onSubmit={handleSubmit}
        className="my-5 space-y-5 rounded bg-white p-6 shadow"
      >
        <div>
          <label className="mb-1 block font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded border p-2"
            placeholder="Script Name"
          />
        </div>
        <div>
          <label className="mb-1 block font-medium">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded border p-2"
          >
            {ANALYTICS_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-medium">Location</label>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded border p-2"
          >
            {LOCATIONS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-medium">Script Config</label>
          <textarea
            name="script"
            value={form.script}
            onChange={handleChange}
            rows={5}
            className="w-full rounded border p-2"
            placeholder="Paste your script here"
            required
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium">Active</span>
          <Switch.Root
            checked={form.active}
            onCheckedChange={async (checked) => {
              setForm((prev) => ({ ...prev, active: !checked }));
              handleSwitch(!checked);
            }}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
          >
            <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
          </Switch.Root>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Page;
