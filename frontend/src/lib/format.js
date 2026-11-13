export function formatTanggalIndo(dateValue) {
  if (!dateValue) return '-';
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return String(dateValue);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d);
}

export const BERITA_CATEGORIES = [
  'Prestasi Siswa',
  'Dokumentasi Kegiatan',
  'Berita Madrasah',
  'Pengumuman'
];

export const KATEGORI_BADGE_MAP = {
  'Prestasi Siswa':
    'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
  'Dokumentasi Kegiatan':
    'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/70 dark:text-teal-300 dark:border-teal-800',
  'Berita Madrasah':
    'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
  Pengumuman:
    'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800'
};

