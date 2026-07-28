import AdminCard from "@/components/admin/AdminCard";

export default function AdminPage() {
  return (
    <div>

      <div className="mb-10">

        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Bem-vindo ao Painel Administrativo do Portal REC.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <AdminCard
          title="Notícias"
          value={28}
          description="Publicadas"
        />

        <AdminCard
          title="Categorias"
          value={7}
          description="Cadastradas"
        />

        <AdminCard
          title="Autores"
          value={4}
          description="Equipe"
        />

        <AdminCard
          title="Comentários"
          value={12}
          description="Recebidos"
        />

      </div>

    </div>
  );
}