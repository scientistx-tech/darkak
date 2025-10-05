import React from "react";
import { Input, Button } from "antd";

export default function NoneUserChat({ name }: { name: string }) {
  return (
    <div className="flex h-[400px] flex-col justify-between">
      {/* Chat messages area */}
      <div className="flex-1 space-y-3 overflow-y-auto rounded-lg border bg-gray-50 p-2">
        <div className="mt-2 text-center text-sm text-gray-500">
          👋 Hello {name}, how can we help you today?
        </div>
      </div>

      {/* Chat input */}
      <div className="mt-3 flex items-center gap-2">
        <Input placeholder="Type your message..." size="large" />
        <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
          Send
        </Button>
      </div>
    </div>
  );
}
