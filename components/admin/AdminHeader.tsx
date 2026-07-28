export default function AdminHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>

        <h2 className="text-2xl font-bold text-slate-900">
          Painel Administrativo
        </h2>

        <p className="text-sm text-slate-500">
          Portal REC • Revista de Estratégia & Comportamento
        </p>

      </div>

      <div className="flex items-center gap-3">

        <div className="text-right">

          <p className="text-sm font-semibold text-slate-900">
            Administrador
          </p>

          <p className="text-xs text-slate-500">
            REC Comunicação
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-600 text-lg font-bold text-white">

          R

        </div>

      </div>

    </header>
  );
}