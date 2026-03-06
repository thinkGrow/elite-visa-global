"use client";

import React from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

export function TourPortable({ value }: { value: any[] }) {
  if (!value?.length) return null;

  return (
    <div className="prose prose-slate max-w-none">
      <PortableText
        value={value}
        components={{
          types: {
            image: ({ value }) => (
              <div className="relative my-6 h-[360px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={urlFor(value).width(1600).height(900).url()}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ),

            callout: ({ value }) => {
              const tone = value?.tone ?? "info";
              const toneCls =
                tone === "success"
                  ? "border-emerald-200 bg-emerald-50"
                  : tone === "warning"
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-slate-50";

              return (
                <div className={`my-6 rounded-2xl border p-5 ${toneCls}`}>
                  {value?.title ? (
                    <div className="font-semibold text-slate-900">
                      {value.title}
                    </div>
                  ) : null}
                  {value?.text ? (
                    <div className="mt-2 whitespace-pre-line text-slate-700">
                      {value.text}
                    </div>
                  ) : null}
                </div>
              );
            },

            tableBlock: ({ value }) => (
              <div className="my-8">
                {value?.title ? (
                  <div className="mb-3 text-sm font-semibold text-slate-900">
                    {value.title}
                  </div>
                ) : null}

                <div className="overflow-hidden rounded-2xl border">
                  <table className="w-full text-sm">
                    <tbody>
                      {(value?.rows ?? []).map((r: any, i: number) => (
                        <tr key={i} className="border-t first:border-t-0">
                          <td className="w-[38%] bg-slate-50 px-4 py-3 text-slate-600">
                            {r?.label}
                          </td>
                          <td className="px-4 py-3 text-slate-900">
                            {r?.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          },
        }}
      />
    </div>
  );
}