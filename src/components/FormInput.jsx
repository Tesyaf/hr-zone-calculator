import React, { useState, useRef } from 'react';

/**
 * FormInput - Komponen form input untuk usia, baseline RHR, dan current RHR.
 * Menggunakan animated labels dan validasi input.
 */
export default function FormInput({ onCalculate }) {
  const [age, setAge] = useState(21);
  const [baselineRhr, setBaselineRhr] = useState(60);
  const [currentRhr, setCurrentRhr] = useState(60);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    const ageNum = Number(age);
    const baselineNum = Number(baselineRhr);
    const currentNum = Number(currentRhr);

    if (!age || ageNum < 10 || ageNum > 120) {
      newErrors.age = 'Usia harus antara 10–120 tahun';
    }
    if (!baselineRhr || baselineNum < 30 || baselineNum > 120) {
      newErrors.baselineRhr = 'Baseline RHR harus antara 30–120 bpm';
    }
    if (!currentRhr || currentNum < 30 || currentNum > 150) {
      newErrors.currentRhr = 'RHR hari ini harus antara 30–150 bpm';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        age: Number(age),
        baselineRhr: Number(baselineRhr),
        currentRhr: Number(currentRhr),
      });
    }
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const inputBaseClass = `w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-lg font-medium placeholder-gray-600
    focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/60 transition-all duration-200`;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" id="hr-form">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Usia Input */}
        <div className="group" id="input-age-group">
          <label
            htmlFor="input-age"
            className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-emerald-400 transition-colors"
          >
            Usia (Tahun)
          </label>
          <div className="relative">
            <input
              id="input-age"
              type="number"
              min="10"
              max="120"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                clearError('age');
              }}
              className={`${inputBaseClass} ${errors.age ? 'border-red-500/60' : 'border-white/[0.08] hover:border-white/[0.15]'}`}
              placeholder="Cth: 25"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium">tahun</div>
          </div>
          {errors.age && (
            <p className="text-red-400 text-xs mt-1.5 animate-shake">{errors.age}</p>
          )}
        </div>

        {/* Baseline RHR Input */}
        <div className="group" id="input-baseline-rhr-group">
          <label
            htmlFor="input-baseline-rhr"
            className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-emerald-400 transition-colors"
          >
            Baseline RHR
          </label>
          <div className="relative">
            <input
              id="input-baseline-rhr"
              type="number"
              min="30"
              max="120"
              value={baselineRhr}
              onChange={(e) => {
                setBaselineRhr(e.target.value);
                clearError('baselineRhr');
              }}
              className={`${inputBaseClass} ${errors.baselineRhr ? 'border-red-500/60' : 'border-white/[0.08] hover:border-white/[0.15]'}`}
              placeholder="Cth: 60"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium">bpm</div>
          </div>
          {errors.baselineRhr && (
            <p className="text-red-400 text-xs mt-1.5 animate-shake">{errors.baselineRhr}</p>
          )}
          <p className="text-[10px] text-gray-600 mt-1">Rata-rata RHR normal Anda</p>
        </div>

        {/* Current RHR Input */}
        <div className="group" id="input-current-rhr-group">
          <label
            htmlFor="input-current-rhr"
            className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-emerald-400 transition-colors"
          >
            RHR Hari Ini
          </label>
          <div className="relative">
            <input
              id="input-current-rhr"
              type="number"
              min="30"
              max="150"
              value={currentRhr}
              onChange={(e) => {
                setCurrentRhr(e.target.value);
                clearError('currentRhr');
              }}
              className={`${inputBaseClass} ${errors.currentRhr ? 'border-red-500/60' : 'border-white/[0.08] hover:border-white/[0.15]'}`}
              placeholder="Cth: 63"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium">bpm</div>
          </div>
          {errors.currentRhr && (
            <p className="text-red-400 text-xs mt-1.5 animate-shake">{errors.currentRhr}</p>
          )}
          <p className="text-[10px] text-gray-600 mt-1">Ukur saat bangun pagi</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        id="btn-calculate"
        type="submit"
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 
          py-3.5 text-white font-semibold text-sm uppercase tracking-wider
          hover:from-emerald-500 hover:to-teal-400 active:scale-[0.98]
          transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30
          focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Analisis Latihan
        </span>
        {/* Shimmer effect */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </button>
    </form>
  );
}
