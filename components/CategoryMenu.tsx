"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
};

export default function CategoryMenu({
  categories,
}: Props) {

 const pathname = usePathname();

  return (
    <div className="sticky top-[97px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6 py-3">

        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
className={`
  whitespace-nowrap
  border-b-2
  pb-2
  text-sm
  font-semibold
  transition-all
  ${
    pathname === `/categoria/${cat.slug}`
      ? "border-cyan-600 text-cyan-900"
      : "border-transparent text-slate-700 hover:border-cyan-600 hover:text-cyan-600"
  }
`}
          >
            {cat.name}
          </Link>
        ))}

      </div>
    </div>
  );
}