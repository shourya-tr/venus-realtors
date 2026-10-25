import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  properties: { address: string } | null;
};

export default async function AdminLeadsPage() {
  const supabase = createAdminClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, created_at, name, phone, properties(address)")
    .order("created_at", { ascending: false })
    .returns<LeadRow[]>();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Leads</h1>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load leads: {error.message}
        </p>
      )}

      {!error && (leads?.length ?? 0) === 0 && (
        <p className="mt-4 rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          No leads yet.
        </p>
      )}

      {(leads?.length ?? 0) > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Property</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads?.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{lead.name}</td>
                  <td className="px-4 py-3 text-slate-700">{lead.phone}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {lead.properties?.address ?? "(listing removed)"}
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
