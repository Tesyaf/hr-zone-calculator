import React, { useState, useCallback } from 'react';
import { calculateHrZones } from './utils/hrCalculator';
import { generateDailyRunPlan } from './utils/trainingPlanner';
import FormInput from './components/FormInput';
import ResultTable from './components/ResultTable';
import RecommendationCard from './components/RecommendationCard';

/**
 * App - Komponen utama aplikasi Kalkulator HR & Tracker Kesiapan Lari.
 * Mengelola state dan layout utama, mengintegrasikan kalkulasi zona HR
 * dengan rekomendasi latihan harian berdasarkan deviasi RHR.
 */
function App() {
  const [data, setData] = useState(null);

  const handleCalculate = useCallback(({ age, baselineRhr, currentRhr }) => {
    const hrData = calculateHrZones(age, baselineRhr);
    const planData = generateDailyRunPlan(baselineRhr, currentRhr);
    const deviation = currentRhr - baselineRhr;

    // Cari data zona target dari hasil kalkulasi
    const targetZoneData = hrData.zones.find((z) => z.key === planData.targetZone);

    setData({
      hr: hrData,
      plan: planData,
      deviation,
      targetZoneData,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 bg-grid-pattern relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-emerald-500/[0.07] blur-[100px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-teal-500/[0.05] blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[150px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="w-full max-w-2xl animate-slide-up">
          {/* Header */}
          <header className="text-center mb-8" id="app-header">
            {/* Logo Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4 shadow-lg shadow-emerald-500/10">
              <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-2">
              Kalkulator HR & Tracker Kesiapan Lari
            </h1>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Hitung zona latihan detak jantung dan dapatkan rekomendasi menu lari harian menggunakan{' '}
              <span className="text-gray-400 font-medium">Formula Karvonen</span>{' '}
              berdasarkan standar <span className="text-gray-400 font-medium">ACSM</span>
            </p>
          </header>

          {/* Card Container */}
          <div className="glass-card rounded-2xl p-5 sm:p-7 shadow-2xl shadow-black/30" id="calculator-card">
            <FormInput onCalculate={handleCalculate} />

            {/* Results Section */}
            {data && (
              <>
                {/* Divider — Rekomendasi Harian */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">Rekomendasi Harian</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>

                {/* Recommendation Card */}
                <RecommendationCard
                  plan={data.plan}
                  deviation={data.deviation}
                  targetZoneData={data.targetZoneData}
                />

                {/* Divider — Zona HR */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">Zona Heart Rate</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>

                {/* HR Zone Results */}
                <ResultTable data={data.hr} />
              </>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center mt-6 text-xs text-gray-600" id="app-footer">
            <p>
              HR Zone Calculator &middot; Formula Karvonen &middot; Standar ACSM
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
