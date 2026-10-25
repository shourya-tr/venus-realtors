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
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 text-2xl text-emerald-600">
          &#10003;
        </div>
        <p className="text-lg font-bold text-stone-900">Thanks for your interest!</p>
        <p className="mt-1 text-sm text-stone-500">We&apos;ll be in touch soon.</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition-colors active:bg-stone-700"
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
      <h3 className="text-lg font-bold text-stone-900">I&apos;m interested</h3>
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
            placeholder="Your full name"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-base transition-colors focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-600 focus:outline-none"
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
            placeholder="+91 98765 43210"
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-base transition-colors focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>
      </div>

      {state.error && <p className="mt-3 text-sm text-red-600">{state.error}</p>}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all active:shadow-none disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 transition-colors active:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
