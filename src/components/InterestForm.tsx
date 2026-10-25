"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/leads";

const initialState: LeadFormState = { success: false };

export default function InterestForm({
  propertyId,
  onClose,
}: {
  propertyId: string;
  onClose: () => void;
}) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  if (state.success) {
    return (
      <div className="px-5 pb-8 pt-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl">
          &#10003;
        </div>
        <p className="text-base font-semibold text-stone-900">Thanks for your interest!</p>
        <p className="mt-1 text-sm text-stone-500">We&apos;ll be in touch soon.</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white active:bg-stone-700"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="px-5 pb-8 pt-6">
      <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-stone-300 sm:hidden" />
      <input type="hidden" name="property_id" value={propertyId} />
      <h3 className="text-base font-semibold text-stone-900">I&apos;m interested</h3>
      <p className="mt-1 text-sm text-stone-500">
        Leave your details and we&apos;ll reach out.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-stone-700">
            Name
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-medium text-stone-700">
            Phone number
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>
      </div>

      {state.error && <p className="mt-3 text-sm text-red-600">{state.error}</p>}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-xl bg-amber-700 px-4 py-3 text-sm font-semibold text-white active:bg-amber-800 disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 active:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
