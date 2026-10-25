"use client";

import { deleteProperty } from "./actions";

export default function DeletePropertyButton({ id }: { id: string }) {
  return (
    <form
      action={deleteProperty}
      onSubmit={(e) => {
        if (!window.confirm("Delete this listing? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="w-full rounded-xl border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 active:bg-red-50 sm:w-auto sm:py-1.5 sm:hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
