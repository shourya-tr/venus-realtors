"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryFormState } from "@/app/actions/leads";

const initialState: EnquiryFormState = { success: false };

export default function EnquirySection() {
  const [state, formAction, isPending] = useActionState(submitEnquiry, initialState);

  return (
    <section className="border-t border-stone-200 bg-stone-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Enquire with us
          </h2>
          <p className="mt-2 text-sm text-stone-400 sm:text-base">
            Interested in any of our properties? Leave your details and our team will get back to you.
          </p>

          {state.success ? (
            <div className="mt-8 rounded-2xl border border-stone-700 bg-stone-800 p-8">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-900/50 text-2xl text-emerald-400">
                &#10003;
              </div>
              <p className="text-lg font-bold text-white">Thank you!</p>
              <p className="mt-1 text-sm text-stone-400">We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form action={formAction} className="mt-8 space-y-4 text-left">
              <div>
                <label htmlFor="enquiry-name" className="block text-sm font-medium text-stone-300">
                  Name
                </label>
                <input
                  id="enquiry-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white placeholder-stone-500 transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="enquiry-phone" className="block text-sm font-medium text-stone-300">
                  Phone number
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white placeholder-stone-500 transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="enquiry-message" className="block text-sm font-medium text-stone-300">
                  Message (optional)
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={3}
                  placeholder="Tell us which property you're interested in or any questions you have..."
                  className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white placeholder-stone-500 transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
              </div>

              {state.error && (
                <p className="text-sm text-red-400">{state.error}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition-colors active:bg-amber-700 disabled:opacity-60 sm:hover:bg-amber-700"
              >
                {isPending ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
