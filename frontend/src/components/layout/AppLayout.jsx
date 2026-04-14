import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#020617] text-white">

      {/* Контент */}
      <div className="flex-1 p-8 overflow-y-auto">
        <button
          onClick={() => setOpen(!open)}
          className="mb-4 p-2 bg-white/10 rounded-lg"
        >
          ☰
        </button>

        {children}
      </div>

      {/* Sidebar справа */}
      <Sidebar open={open} setOpen={setOpen} />
    </div>
  );
}