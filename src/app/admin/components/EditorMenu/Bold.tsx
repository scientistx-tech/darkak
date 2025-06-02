"use client";
import React from "react";
import { useActive, useChainedCommands, useCommands } from "@remirror/react";
import {
  CommandButtonGroup,
  CommandMenuItem,
  DecreaseFontSizeButton,
  DropdownButton,
  IncreaseFontSizeButton,
  Toolbar,
} from "@remirror/react-ui";

export const Bold = () => {
  // Using command chaining
  const chain = useChainedCommands();
  const active = useActive();

  return (
    <button
      onClick={() => {
        chain // Begin a chain
          .toggleBold()
          .focus()
          .run(); // A chain must always be terminated with `.run()`
      }}
      style={{ fontWeight: active.bold() ? "bold" : undefined }}
    >
      B
    </button>
  );
};
export const Image = () => {
  // Using command chaining
  const chain = useChainedCommands();
  const active = useActive();

  return (
    <button
      onClick={() => {
        chain // Begin a chain
          .insertImage({
            src: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
            alt: "img",
          })
          .focus()
          .run(); // A chain must always be terminated with `.run()`
      }}
      style={{ fontWeight: active.image() ? "bold" : undefined }}
    >
      Image
    </button>
  );
};
export const FontSizeButtons = () => {
  const { setFontSize } = useCommands();
  const { fontSize } = useActive();
  const FONT_SIZES = ["8", "10", "12", "14", "16", "18", "24", "30"];
  return (
    <DropdownButton aria-label="Set font size" icon="fontSize">
      {FONT_SIZES.map((size) => (
        <div key={size}>{size}</div>
        
      ))}
    </DropdownButton>
  );
};
