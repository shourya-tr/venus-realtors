import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  properties: { address: string; name: string } | null;
};

export default async function AdminLeadsPage() {
  const supabase = createAdminClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, created_at, name, phone, properties(address, name)")
    .order("created_at", { ascending: false })
    .returns<LeadRow[]>();

  return (
    <div>
      <h1 className="text-xl font-bold text-stone-900 sm:text-2xl">Leads</h1>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load leads: {error.message}
        </p>
      )}

      {!error && (leads?.length ?? 0) === 0 && (
        <p className="mt-4 rounded-xl border border-stone-200 bg-white p-10 text-center text-sm text-stone-500">
          No leads yet.
        </p>
      )}

      {/* Mobile: card layout */}
      {(leads?.length ?? 0) > 0 && (
        <div className="mt-5 space-y-3 sm:hidden">
          {leads?.map((lead) => (
            <div key={lead.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-stone-900">{lead.name}</p>
                  <a href={`tel:${lead.phone}`} className="text-sm text-amber-700">{lead.phone}</a>
                </div>
                <p className="text-xs text-stone-400">
                  {new Date(lead.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>
              <p className="mt-2 text-sm text-stone-500">
                {lead.properties?.name || lead.properties?.address || "(listing removed)"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Desktop: table layout */}
      {(leads?.length ?? 0) > 0 && (
        <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm sm:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Property</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {leads?.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-500">
                    {new Date(lead.created_at).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3 font-medium text-stone-900">{lead.name}</td>
                  <td className="px-4 py-3 text-stone-700">{lead.phone}</td>
                  <td className="px-4 py-3 text-stone-700">
                    {lead.properties?.name || lead.properties?.address || "(listing removed)"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
