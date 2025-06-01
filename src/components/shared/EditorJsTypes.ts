declare module '@editorjs/embed' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const Embed: ToolConstructable;

  export = Embed;
}

declare module '@editorjs/link' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const LinkTool: ToolConstructable;

  export = LinkTool;
}

declare module '@editorjs/raw' {
  import { ToolConstructable } from '@editorjs/editorjs';

  const RawTool: ToolConstructable;

  export = RawTool;
}

declare module 'editorjs-text-color-plugin' {
  import { InlineTool } from '@editorjs/editorjs';

  const TextColorPlugin: InlineTool;

  export = TextColorPlugin;
}