import React from 'react';
import { DISCLAIMER_TEXT } from '../utils/trainingPlanner';

/**
 * Status icon SVGs for each readiness category.
 */
const StatusIcon = ({ type }) => {
  const icons = {
    pause: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    walk: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    bolt: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    rocket: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  };
  return icons[type] || icons.bolt;
};

/**
 * RecommendationCard - Komponen kartu analisis kesiapan lari harian.
 * Menampilkan status, rekomendasi, durasi, dan target zone
 * berdasarkan deviasi RHR.
 */
export default function RecommendationCard({ plan, deviation, targetZoneData }) {
  if (!plan || !targetZoneData) return null;

  const deviationLabel = deviation > 0 ? `+${deviation}` : `${deviation}`;

  return (
    <div
      id="recommendation-card"
      className="relative overflow-hidden rounded-xl border p-5 space-y-4 animate-fade-in"
      style={{
        borderColor: `${plan.color}30`,
        background: `linear-gradient(135deg, ${plan.color}08, transparent 60%)`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${plan.gradient[0]}, ${plan.gradient[1]}, transparent)` }}
      />

      {/* Header: Status + Deviation Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{
              background: `${plan.color}15`,
              color: plan.color,
              border: `1px solid ${plan.color}25`,
            }}
          >
            <StatusIcon type={plan.icon} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
              Status Kesiapan Kardio
            </p>
            <h3 className="text-base font-bold text-white leading-tight">{plan.status}</h3>
          </div>
        </div>

        {/* Deviation Badge */}
        <span
          className="shrink-0 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border"
          style={{
            color: plan.color,
            borderColor: `${plan.color}30`,
            background: `${plan.color}10`,
          }}
        >
          Deviasi: {deviationLabel} bpm
        </span>
      </div>

      {/* Recommendation Details */}
      <div className="space-y-2 pt-3 border-t border-white/[0.06]">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 shrink-0 w-14">Menu</span>
          <span className="text-sm text-gray-200 font-medium">{plan.recommendation}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 shrink-0 w-14">Durasi</span>
          <span className="text-sm text-gray-200 font-medium">{plan.duration}</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed italic mt-1 pl-0.5">
          {plan.description}
        </p>
      </div>

      {/* Target Zone Card */}
      <div
        className="rounded-lg p-3.5 border"
        style={{
          background: `${targetZoneData.color}08`,
          borderColor: `${targetZoneData.color}20`,
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1">
          Target Range Hari Ini
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold tabular-nums text-white">
            {targetZoneData.minBpm} – {targetZoneData.maxBpm}
          </span>
          <span className="text-xs text-gray-500">bpm</span>
          <span
            className="ml-auto text-xs font-semibold px-2 py-0.5 rounded"
            style={{
              color: targetZoneData.color,
              background: `${targetZoneData.color}15`,
            }}
          >
            {targetZoneData.name} · {targetZoneData.label}
          </span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="pt-3 border-t border-white/[0.04]">
        <p className="text-[10px] text-gray-600 leading-relaxed">
          <span className="text-gray-500 font-semibold">Disclaimer:</span>{' '}
          {DISCLAIMER_TEXT}
        </p>
      </div>
    </div>
  );
}
