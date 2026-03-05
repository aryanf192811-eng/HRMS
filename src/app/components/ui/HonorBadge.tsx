import React from "react";
import { Info } from "lucide-react";

interface HonorBadgeProps {
  score: number;
  size?: "sm" | "md";
}

const HonorBadge: React.FC<HonorBadgeProps> = ({ score, size = "md" }) => {
  const getColor = (s: number) => {
    if (s >= 85) return "#22c55e"; // Green
    if (s >= 70) return "#eab308"; // Yellow
    return "#ef4444"; // Red
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      className={`flex items-center gap-3 bg-white p-2 rounded-full border border-gray-100 shadow-sm ${
        size === "sm" ? "scale-75" : ""
      }`}
    >
      <div className="relative flex items-center justify-center">
        <svg className="transform -rotate-90 w-12 h-12">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke={getColor(score)}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset,
              transition: "stroke-dashoffset 0.8s ease-out",
            }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[10px] font-bold text-gray-800">{score}</span>
      </div>
      <div className="flex flex-col pr-2">
        <span className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold leading-none">
          Honor Score
        </span>
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-gray-700">
            Sustainability
          </span>
          <Info className="w-3 h-3 text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default HonorBadge;
