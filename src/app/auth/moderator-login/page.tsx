import React from "react";
import { Metadata } from "next";
import ModeratorLoginForm from "./component/ModeratorLoginForm";
export const metadata: Metadata = {
  title: "Moderator Login",
};
export default function page() {
  return (
    <div className="w-full">
      <ModeratorLoginForm />
    </div>
  );
}
