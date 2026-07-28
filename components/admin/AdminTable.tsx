import { ReactNode } from "react";

type Props = {
  headers: string[];
  children: ReactNode;
};

export default function AdminTable({
  headers,
  children,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            {headers.map((header) => (

              <th
                key={header}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-700"
              >
                {header}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {children}

        </tbody>

      </table>

    </div>
  );
}