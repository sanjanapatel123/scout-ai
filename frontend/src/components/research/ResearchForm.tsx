import React, { useState } from "react";
import { Globe, ArrowRight, Loader2 } from "lucide-react";

import { HERO } from "@/constants/testIds";
import { isValidUrl, normaliseUrl } from "@/lib/format";

interface ResearchFormProps {
  onSubmit: (url: string) => void;
  submitting: boolean;
}

export const ResearchForm = ({ onSubmit, submitting }: ResearchFormProps) => {
  const [value, setValue] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const invalid = touched && value.length > 0 && !isValidUrl(value);

  const disabled = submitting || value.trim().length === 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched(true);

    if (!isValidUrl(value)) return;

    onSubmit(normaliseUrl(value));

    setValue("");
    setTouched(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Globe
            className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-scout-text-secondary pointer-events-none"
            strokeWidth={2}
            aria-hidden
          />

          <input
            data-testid={HERO.urlInput}
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="Paste a website URL..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-label="Website URL"
            aria-invalid={invalid}
            className={`w-full bg-white border rounded-lg pl-11 pr-4 py-3 text-sm text-scout-text placeholder-scout-text-secondary/80 focus:outline-none focus:ring-2 focus:ring-scout-primary/25 focus:border-scout-primary transition-all shadow-scout-sm ${
              invalid ? "border-scout-error/60" : "border-scout-border"
            }`}
          />
        </div>

        <button
          type="submit"
          data-testid={HERO.submit}
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-scout-primary hover:bg-scout-primary-hover disabled:bg-scout-primary/50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors shadow-scout-sm whitespace-nowrap"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.25} />
              Researching...
            </>
          ) : (
            <>
              Start Research
              <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
            </>
          )}
        </button>
      </div>

      {invalid && (
        <p className="mt-2 text-xs text-scout-error">
          Please enter a valid website URL.
        </p>
      )}
    </form>
  );
};
