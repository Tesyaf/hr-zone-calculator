/**
 * Training Planner — Logika penentu rencana lari harian.
 * Menentukan rekomendasi latihan berdasarkan deviasi RHR hari ini
 * terhadap baseline RHR rata-rata.
 *
 * Basis literatur: Respons otonom jantung (HRV/RHR) sebagai
 * indikator kesiapan fisiologis untuk latihan.
 *
 * @module trainingPlanner
 */

/**
 * Pemetaan status, warna, dan ikon untuk setiap kategori kesiapan.
 */
const STATUS_CONFIG = {
  rest: {
    color: '#ef4444',
    gradient: ['#dc2626', '#ef4444'],
    icon: 'pause',
  },
  easy: {
    color: '#fbbf24',
    gradient: ['#f59e0b', '#fbbf24'],
    icon: 'walk',
  },
  optimal: {
    color: '#34d399',
    gradient: ['#10b981', '#34d399'],
    icon: 'bolt',
  },
  peak: {
    color: '#60a5fa',
    gradient: ['#3b82f6', '#60a5fa'],
    icon: 'rocket',
  },
};

/**
 * Menentukan rencana lari harian berdasarkan deviasi RHR.
 * @param {number} baselineRhr - RHR rata-rata (baseline)
 * @param {number} currentRhr - RHR hari ini
 * @returns {Object} Rencana lari harian beserta metadata visual
 */
export const generateDailyRunPlan = (baselineRhr, currentRhr) => {
  const deviation = currentRhr - baselineRhr;

  if (deviation >= 7) {
    return {
      statusKey: 'rest',
      status: 'Rest / Active Recovery',
      ...STATUS_CONFIG.rest,
      recommendation: 'Sesi Istirahat Total atau Recovery Run (Zona 1)',
      duration: '20 – 30 Menit',
      targetZone: 'zone1',
      description:
        'Jantung mengalami stress atau kurang recovery. Hindari latihan intensitas tinggi untuk mencegah overtraining.',
    };
  }

  if (deviation >= 3 && deviation < 7) {
    return {
      statusKey: 'easy',
      status: 'Easy / Base Building',
      ...STATUS_CONFIG.easy,
      recommendation: 'Easy Endurance Run (Zona 2)',
      duration: '45 – 60 Menit',
      targetZone: 'zone2',
      description:
        'Tubuh terindikasi sedikit lelah. Fokus pada lari santai untuk menjaga akumulasi volume latihan tanpa membebani sistem kardiovaskular.',
    };
  }

  if (deviation >= -2 && deviation < 3) {
    return {
      statusKey: 'optimal',
      status: 'Optimal / Ready for Intensity',
      ...STATUS_CONFIG.optimal,
      recommendation: 'Tempo Run (Zona 3) atau Interval Session (Zona 4/5)',
      duration: '30 – 45 Menit',
      targetZone: 'zone3',
      description:
        'Kondisi otonom prima. Hari yang tepat jika Anda memiliki jadwal sesi speedwork atau kekuatan.',
    };
  }

  // Deviasi < -2 (RHR drop rendah — bisa peak, bisa parasympathetic fatigue)
  return {
    statusKey: 'peak',
    status: 'Peak Condition / Check Feelings',
    ...STATUS_CONFIG.peak,
    recommendation: 'Long Run (Zona 2) atau Sesi Spesifik',
    duration: '60 – 90 Menit',
    targetZone: 'zone2',
    description:
      'RHR sangat efisien. Namun jika otot terasa sangat lelah, waspadai fatigue parasimpatis. Sesuaikan dengan kondisi riil fisik Anda.',
  };
};

export const DISCLAIMER_TEXT =
  'Analisis ini bersifat prediktif berdasarkan respons otonom (RHR). Jika RHR terdeteksi rendah/normal tetapi performa otot terasa kaku atau lelah, utamakan sinyal internal tubuh Anda (Rating of Perceived Exertion).';
