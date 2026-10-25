import { createProperty } from "./actions";

export default async function NewPropertyPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-bold text-stone-900 sm:text-2xl">Add Property</h1>

      <form
        action={createProperty}
        encType="multipart/form-data"
        className="mt-5 space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700">
            Property name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Sunrise Villa"
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-stone-700">
              Price (INR)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="1"
              required
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-stone-700">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-stone-700">
              Beds
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              min="0"
              step="1"
              required
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-stone-700">
              Baths
            </label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              min="0"
              step="0.5"
              required
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="sqft" className="block text-sm font-medium text-stone-700">
              Sq ft
            </label>
            <input
              id="sqft"
              name="sqft"
              type="number"
              min="0"
              step="1"
              required
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-stone-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="youtube_url" className="block text-sm font-medium text-stone-700">
            YouTube video link (optional)
          </label>
          <input
            id="youtube_url"
            name="youtube_url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="photos" className="block text-sm font-medium text-stone-700">
            Photos
          </label>
          <input
            id="photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-1 file:text-sm file:font-medium file:text-stone-700"
          />
        </div>

        {params.error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {params.error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white active:bg-stone-700 sm:hover:bg-stone-700"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}
