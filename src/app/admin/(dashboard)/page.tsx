import Link from "next/link";

const cards = [
  {
    href: "/admin/properties/new",
    title: "Add Property",
    desc: "Create a new listing with photos and details.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    accent: "bg-amber-100 text-amber-700",
  },
  {
    href: "/admin/properties",
    title: "Listings",
    desc: "View, edit, and manage existing listings.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    accent: "bg-blue-100 text-blue-700",
  },
  {
    href: "/admin/leads",
    title: "Leads",
    desc: "See everyone who showed interest.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: "bg-emerald-100 text-emerald-700",
  },
];

export default function AdminHomePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-stone-900 sm:text-2xl">Dashboard</h1>
        <p className="mt-1 text-sm text-stone-500">Manage your properties and leads.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all active:shadow-md active:-translate-y-0.5 sm:hover:shadow-md sm:hover:-translate-y-0.5"
          >
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${card.accent} transition-transform sm:group-hover:scale-110`}>
              {card.icon}
            </div>
            <div>
              <p className="font-semibold text-stone-900">{card.title}</p>
              <p className="mt-0.5 text-sm text-stone-500">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
