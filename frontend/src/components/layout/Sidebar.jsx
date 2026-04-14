import {
  Home,
  Wallet,
  BarChart2,
  Users,
  HelpCircle,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  return (
    <div
      className={`h-full bg-[#0F172A]/90 backdrop-blur-lg border-l border-white/10 flex flex-col transition-all duration-300
      ${open ? "w-64" : "w-20"}`}
    >
      {/* Верх */}
      <div className="p-4 flex justify-between items-center">
        {open && (
          <h1 className="text-xl font-bold text-blue-400">ФинХ</h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          ☰
        </button>
      </div>

      {/* Меню */}
      <nav className="flex flex-col gap-4 mt-6 px-3">

        <Item icon={<Home />} label="Рабочий стол" open={open} active />
        <Item icon={<Wallet />} label="Бюджеты" open={open} />
        <Item icon={<BarChart2 />} label="Отчеты" open={open} />
        <Item icon={<Users />} label="Матрица" open={open} />
        <Item icon={<HelpCircle />} label="Поддержка" open={open} />

      </nav>
    </div>
  );
}

function Item({ icon, label, open, active }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
      ${
        active
          ? "bg-blue-500/20 text-blue-400"
          : "text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      <div>{icon}</div>

      {open && <span>{label}</span>}
    </div>
  );
}