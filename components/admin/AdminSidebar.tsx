"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Notícias",
    href: "/admin/news",
  },
  {
    label: "Categorias",
    href: "/admin/categories",
  },
  {
    label: "Autores",
    href: "/admin/team",
  },
  {
    label: "Comentários",
    href: "/admin/comments",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 text-white">

      {/* Logo */}

      <div className="border-b border-slate-800 p-8">

        <h1 className="text-3xl font-extrabold tracking-tight">
          REC
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Painel Administrativo
        </p>

      </div>

      {/* Menu */}

      <nav className="flex-1 p-4">

        {menu.map((item) => {

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                mb-2 block rounded-xl px-4 py-3 text-sm font-medium transition-all
                ${
                  active
                    ? "bg-cyan-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}

      </nav>

      {/* Rodapé */}

      <div className="border-t border-slate-800 p-4">

        <Link
          href="/"
          className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          ← Voltar ao Portal
        </Link>

      </div>

    </aside>
  );
}