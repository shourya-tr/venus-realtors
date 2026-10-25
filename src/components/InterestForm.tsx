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
      <div className="p-6 text-center">
        <p className="text-base font-medium text-slate-900">Thanks for your interest!</p>
        <p className="mt-1 text-sm text-slate-500">We&apos;ll be in touch soon.</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="p-6">
      <input type="hidden" name="property_id" value={propertyId} />
      <h3 className="text-base font-semibold text-slate-900">I&apos;m interested</h3>
      <p className="mt-1 text-sm text-slate-500">
        Leave your name and number and we&apos;ll reach out.
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {state.error && <p className="mt-3 text-sm text-red-600">{state.error}</p>}

      <div className="mt-5 flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
