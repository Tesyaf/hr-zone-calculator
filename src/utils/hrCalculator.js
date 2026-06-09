/**
 * Heart Rate Zone Calculator Engine
 * Menggunakan Formula Karvonen berdasarkan standar ACSM
 *
 * Rumus Karvonen: THR = (HRR × %Intensitas) + RHR
 * Dimana:
 *   - Max HR = 220 - Usia
 *   - HRR (Heart Rate Reserve) = Max HR - RHR
 *   - THR (Target Heart Rate)
 *
 * @module hrCalculator
 */

/**
 * Definisi zona latihan berdasarkan standar ACSM.
 * Setiap zona memiliki rentang persentase intensitas, nama,
 * deskripsi singkat, dan warna identitas.
 */
const ZONE_DEFINITIONS = [
  {
    key: 'zone1',
    min: 0.50,
    max: 0.60,
    name: 'Zona 1',
    label: 'Active Recovery',
    description: 'Pemulihan aktif & pemanasan. Intensitas sangat ringan.',
    color: '#60a5fa', // blue
    gradient: ['#3b82f6', '#60a5fa'],
  },
  {
    key: 'zone2',
    min: 0.60,
    max: 0.70,
    name: 'Zona 2',
    label: 'Aerobic Base',
    description: 'Pembakaran lemak optimal & membangun daya tahan dasar.',
    color: '#34d399', // emerald
    gradient: ['#10b981', '#34d399'],
  },
  {
    key: 'zone3',
    min: 0.70,
    max: 0.80,
    name: 'Zona 3',
    label: 'Tempo',
    description: 'Meningkatkan efisiensi aerobik & daya tahan otot.',
    color: '#fbbf24', // amber
    gradient: ['#f59e0b', '#fbbf24'],
  },
  {
    key: 'zone4',
    min: 0.80,
    max: 0.90,
    name: 'Zona 4',
    label: 'Lactate Threshold',
    description: 'Meningkatkan ambang laktat & daya tahan anaerobik.',
    color: '#f97316', // orange
    gradient: ['#ea580c', '#f97316'],
  },
  {
    key: 'zone5',
    min: 0.90,
    max: 1.00,
    name: 'Zona 5',
    label: 'VO2 Max',
    description: 'Kapasitas maksimal. Interval sprint & daya ledak.',
    color: '#ef4444', // red
    gradient: ['#dc2626', '#ef4444'],
  },
];

/**
 * Menghitung Target Heart Rate (THR) berdasarkan rumus Karvonen.
 * @param {number} age - Usia dalam tahun
 * @param {number} rhr - Resting Heart Rate dalam bpm
 * @returns {Object} Hasil kalkulasi Max HR, HRR, dan batas atas/bawah tiap zona
 */
export const calculateHrZones = (age, rhr) => {
  const maxHr = 220 - age;
  const hrr = maxHr - rhr;

  const zones = ZONE_DEFINITIONS.map((zone) => {
    const minBpm = Math.round((hrr * zone.min) + rhr);
    const maxBpm = Math.round((hrr * zone.max) + rhr);

    return {
      key: zone.key,
      name: zone.name,
      label: zone.label,
      description: zone.description,
      color: zone.color,
      gradient: zone.gradient,
      minBpm,
      maxBpm,
      percentage: `${zone.min * 100}% – ${zone.max * 100}%`,
      percentMin: zone.min,
      percentMax: zone.max,
    };
  });

  return {
    metrics: { maxHr, hrr, rhr: Number(rhr), age: Number(age) },
    zones,
  };
};

export { ZONE_DEFINITIONS };
