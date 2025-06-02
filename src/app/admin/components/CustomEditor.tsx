"use client";

import React from "react";
import {
  Remirror,
  ThemeProvider,
  useRemirror,
  EditorComponent,
  MenuNavigationOptions,
} from "@remirror/react";
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  HeadingExtension,
  CodeExtension,
  ListItemExtension,
  BulletListExtension,
  OrderedListExtension,
  HistoryExtension,
  ImageExtension,
  FontSizeExtension,
} from "remirror/extensions";
import { useEffect } from "react";
import { Bold, FontSizeButtons, Image } from "./EditorMenu/Bold";
import { Toolbar } from "@remirror/react-ui";

interface RemirrorEditorProps {
  onChange?: (html: string) => void;
  initialContent?: string;
}

const CustomEditor: React.FC<RemirrorEditorProps> = ({
  onChange,
  initialContent,
}) => {
  const extensions = () => [
    new BoldExtension({ weight: 900 }),
    new ItalicExtension(),
    new UnderlineExtension(),
    new HeadingExtension({}),
    new CodeExtension(),
    new ListItemExtension({}),
    new BulletListExtension({}),
    new OrderedListExtension(),
    new HistoryExtension({}),
    new ImageExtension({ enableResizing: true }),
    new FontSizeExtension({ defaultSize: "16", unit: "px" }),
  ];
  const {
    manager,
    state,
    onChange: handleEditorChange,
  } = useRemirror({
    extensions,
    content: initialContent || "<p>Type here...</p>",
    stringHandler: "html",
  });

  useEffect(() => {
    if (onChange) {
      const html = state.doc.textContent;
      const htmlOutput = manager.createState({ content: state.doc }).toJSON(); // Intermediate step
      const htmlString = manager.store.helpers.getHTML(state); // ✅
      console.log(htmlOutput);
      onChange(htmlString);
    }
  }, [state, onChange]);

  return (
    <ThemeProvider className="mt-0 gap-0 space-y-0">
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} state={state} onChange={handleEditorChange}>
        <Toolbar>
          <div className="flex w-full gap-2 bg-primaryBlue p-1 text-white">
            <Bold />
            <FontSizeButtons />
            <Image />
          </div>
        </Toolbar>
        <EditorComponent />
      </Remirror>
    </ThemeProvider>
  );
};

export default CustomEditor;
