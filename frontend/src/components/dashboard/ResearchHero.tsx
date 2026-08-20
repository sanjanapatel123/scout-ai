import React from "react";
import { Sparkles } from "lucide-react";
import { ResearchForm } from "@/components/research/ResearchForm";

interface ResearchHeroProps {
  onSubmit: (url: string) => void;
  submitting: boolean;
}

export const ResearchHero = ({ onSubmit, submitting }: ResearchHeroProps) => {
  return (
    <section className="relative bg-white border border-scout-border rounded-xl p-6 lg:p-8 shadow-scout-sm overflow-hidden">
      <div
        className="scout-grain absolute inset-0 opacity-60 pointer-events-none"
        aria-hidden
      />

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-scout-primary/8 border border-scout-primary/15 text-xs font-medium text-scout-primary mb-4">
          <Sparkles className="w-3 h-3" strokeWidth={2.25} />
          AI-powered research
        </div>

        <h1 className="text-3xl lg:text-[32px] font-bold text-scout-text tracking-tight leading-tight">
          AI Web Research
        </h1>

        <p className="mt-2 text-sm lg:text-[15px] text-scout-text-secondary max-w-xl leading-relaxed">
          Turn any website into structured business intelligence — company
          profile, services, contact info and an AI summary, delivered
          automatically.
        </p>

        <div className="mt-6 max-w-2xl">
          <ResearchForm onSubmit={onSubmit} submitting={submitting} />
        </div>
      </div>
    </section>
  );
};
