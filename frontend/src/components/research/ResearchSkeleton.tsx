import React from "react";
import { TABLE } from "@/constants/testIds";

interface BarProps {
  w?: string;
  h?: number;
}

const Bar = ({ w = "100%", h = 12 }: BarProps) => (
  <div
    className="animate-pulse bg-scout-border/70 rounded"
    style={{ width: w, height: h }}
  />
);

export const ResearchTableSkeleton = () => {
  return (
    <div
      data-testid={TABLE.skeleton}
      className="bg-white border border-scout-border rounded-lg overflow-hidden"
    >
      <div className="bg-scout-bg border-b border-scout-border px-6 py-3">
        <Bar w="120px" h={10} />
      </div>

      <div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-6 py-4 border-b border-scout-border last:border-b-0"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-md bg-scout-border/70 animate-pulse" />

              <div className="flex flex-col gap-2 flex-1">
                <Bar w="60%" />
                <Bar w="40%" h={10} />
              </div>
            </div>

            <div className="hidden md:block flex-1">
              <Bar w="70%" />
            </div>

            <div className="w-20">
              <Bar w="72px" h={20} />
            </div>

            <div className="hidden sm:block w-16">
              <Bar w="60px" h={10} />
            </div>

            <div className="w-16">
              <Bar w="48px" h={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
