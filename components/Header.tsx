import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-5">
          <Image
            src="/logo-rec.png"
            alt="REC Comunicação"
            width={54}
            height={54}
            priority
          />

          <div className="leading-none">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              REC
            </h1>

            <p className="mt-0.5 text-sm font-bold uppercase tracking-wider text-slate-900">
              Comunicação
            </p>

            <p className="mt-1 text-xs font-medium text-slate-600">
              Revista de Estratégia &amp; Comportamento
            </p>
          </div>
        </Link>

<nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
  <Link
    href="/"
    className="transition hover:text-cyan-600"
  >
    Início
  </Link>

  <Link
    href="/sobre"
    className="transition hover:text-cyan-600"
  >
    Sobre
  </Link>

  <Link
    href="/contato"
    className="transition hover:text-cyan-600"
  >
    Contato
  </Link>

  <Link
    href="/busca"
    className="
      flex items-center gap-2
      rounded-lg
      bg-slate-900
      px-4 py-2.5
      text-sm font-bold
      text-white
      transition
      hover:bg-cyan-600
    "
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>

    Buscar
  </Link>
</nav>
      </div>
    </header>
  );
}