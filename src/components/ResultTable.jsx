import React from 'react';

/**
 * ResultTable - Komponen tampilan hasil kalkulasi zona HR.
 * Menampilkan metrics summary dan visual zone cards.
 */
export default function ResultTable({ data }) {
  if (!data) return null;

  const { metrics, zones } = data;

  return (
    <div className="space-y-6 animate-fade-in" id="result-section">
      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-3 gap-3" id="metrics-summary">
        <MetricCard label="Max HR" value={metrics.maxHr} unit="bpm" />
        <MetricCard label="HRR" value={metrics.hrr} unit="bpm" />
        <MetricCard label="RHR" value={metrics.rhr} unit="bpm" />
      </div>

      {/* Zone Cards */}
      <div className="space-y-3" id="zone-cards">
        {zones.map((zone, index) => (
          <ZoneCard
            key={zone.key}
            zone={zone}
            index={index}
            maxHr={metrics.maxHr}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-gray-500 pt-2 border-t border-white/[0.05]">
        <p>Berdasarkan Formula Karvonen &amp; standar <span className="text-gray-400 font-medium">ACSM</span></p>
        <p className="mt-1">Max HR = 220 − Usia &nbsp;|&nbsp; THR = (HRR × %Intensitas) + RHR</p>
      </div>
    </div>
  );
}

/**
 * MetricCard - Kartu kecil untuk menampilkan satu metrik.
 */
function MetricCard({ label, value, unit }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center group hover:border-white/[0.1] transition-colors">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white tabular-nums">
        {value}
        <span className="text-xs font-normal text-gray-500 ml-1">{unit}</span>
      </p>
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

/**
 * ZoneCard - Kartu visual untuk satu zona HR.
 * Menampilkan bar progress, range BPM, dan deskripsi.
 */
function ZoneCard({ zone, index, maxHr }) {
  // Hitung lebar bar relatif terhadap max HR
  const barMin = (zone.minBpm / maxHr) * 100;
  const barMax = (zone.maxBpm / maxHr) * 100;
  const barWidth = barMax - barMin;

  return (
    <div
      id={`zone-card-${zone.key}`}
      className="group relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.06] p-4
        hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Zone Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {/* Color dot */}
          <div
            className="w-3 h-3 rounded-full ring-2 ring-offset-1 ring-offset-gray-950"
            style={{
              background: `linear-gradient(135deg, ${zone.gradient[0]}, ${zone.gradient[1]})`,
              ringColor: zone.color,
              boxShadow: `0 0 8px ${zone.color}40`,
            }}
          />
          <div>
            <span className="text-sm font-bold text-white">{zone.name}</span>
            <span className="text-xs text-gray-400 ml-2 font-medium">{zone.label}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold tabular-nums text-white">
            {zone.minBpm}–{zone.maxBpm}
          </span>
          <span className="text-xs text-gray-500 ml-1">bpm</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-white/[0.04] rounded-full overflow-hidden mb-2">
        <div
          className="absolute h-full rounded-full transition-all duration-700 ease-out"
          style={{
            left: `${barMin}%`,
            width: `${barWidth}%`,
            background: `linear-gradient(90deg, ${zone.gradient[0]}, ${zone.gradient[1]})`,
            boxShadow: `0 0 12px ${zone.color}30`,
          }}
        />
      </div>

      {/* Zone Details */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 leading-relaxed max-w-[70%]">{zone.description}</p>
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-white/[0.04] text-gray-400">
          {zone.percentage}
        </span>
      </div>

      {/* Left accent border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
        style={{ background: `linear-gradient(to bottom, ${zone.gradient[0]}, ${zone.gradient[1]})` }}
      />
    </div>
  );
}
