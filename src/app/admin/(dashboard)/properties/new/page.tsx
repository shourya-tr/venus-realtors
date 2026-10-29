import NewPropertyForm from "./NewPropertyForm";

export default async function NewPropertyPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-bold text-stone-900 sm:text-2xl">Add Property</h1>
      <NewPropertyForm error={params.error} />
    </div>
  );
}
