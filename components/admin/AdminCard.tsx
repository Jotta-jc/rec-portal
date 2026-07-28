type AdminCardProps = {
  title: string;
  value: number | string;
  description: string;
};

export default function AdminCard({
  title,
  value,
  description,
}: AdminCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-bold text-slate-900">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

    </div>
  );
}