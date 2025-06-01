import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import axios from "axios";
import Embed from "@editorjs/embed";
import EditorjsList from "@editorjs/list";
import Table from "@editorjs/table";
import RawTool from "@editorjs/raw";
import LinkTool from "@editorjs/link";
import ColorPlugin from "editorjs-text-color-plugin";

export const EDITOR_JS_TOOLS: any = {
  header: Header,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file: File) {
          const formData = new FormData();
          formData.append("image", file);
          const response = await axios.post(`/apis/upload`, formData);

          return {
            success: 1,
            file: {
              url: response.data.url,
            },
          };
        },
      },
    },
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        coub: true,
      },
    },
  },
  table: Table,
  raw: RawTool,
  linkTool: LinkTool,
  list: {
    class: EditorjsList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  Color: {
    class: ColorPlugin,
    config: {
      colorCollections: [
        "#EC7878",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#0070FF",
        "#03A9F4",
        "#00BCD4",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFF",
      ],
      type: "text",
      customPicker: true,
    },
  },
};