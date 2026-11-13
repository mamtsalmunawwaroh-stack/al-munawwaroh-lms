import React, { useState } from 'react';
import { getPreviewInfo } from '../lib/mediaPreview';

const TONE_CLASSES = {
  blue: 'text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 dark:border-blue-800',
  emerald:
    'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 dark:border-emerald-800',
  teal: 'text-teal-700 bg-teal-50 hover:bg-teal-100 border-teal-200 dark:text-teal-300 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 dark:border-teal-800',
  amber:
    'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-200 dark:text-amber-300 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 dark:border-amber-800',
  red: 'text-red-700 bg-red-50 hover:bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-950/60 dark:hover:bg-red-900/60 dark:border-red-800'
};

/**
 * Tombol aksi tautan di dalam tabel / kartu berkas:
 * 1. Pratinjau In-App (membuka PreviewModal tanpa keluar aplikasi)
 * 2. Unduh Cepat (jika tautan mendukung unduhan langsung, mis. Google Drive/Docs/Sheets/PDF)
 * 3. Salin Link (opsional, untuk menyalin tautan G-Drive dengan satu klik)
 * 4. Buka Tautan Lengkap ↗ (membuka halaman asli di tab baru untuk fitur penuh)
 */
export default function LinkActionButtons({
  url,
  title,
  subtitle,
  previewLabel = 'Pratinjau',
  tone = 'emerald',
  showCopy = false,
  onPreview
}) {
  const [copied, setCopied] = useState(false);
  const info = getPreviewInfo(url);

  if (!info) {
    return <span className="text-xs text-slate-400 dark:text-slate-500">Tautan tidak valid</span>;
  }

  const primaryClass = TONE_CLASSES[tone] || TONE_CLASSES.emerald;
  const primaryDownload = info.downloads[0] || null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(info.originalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Abaikan jika clipboard diblokir browser
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <button
        type="button"
        onClick={() => onPreview({ url: info.originalUrl, title, subtitle })}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition whitespace-nowrap ${primaryClass}`}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{previewLabel}</span>
      </button>

      {primaryDownload && (
        <a
          href={primaryDownload.url}
          target="_blank"
          rel="noopener noreferrer"
          download
          title={primaryDownload.label}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition whitespace-nowrap"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
          </svg>
          <span>Unduh</span>
        </a>
      )}

      {showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          title="Salin tautan Google Drive"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition whitespace-nowrap"
        >
          {copied ? 'Tersalin ✓' : 'Salin Link'}
        </button>
      )}

      <a
        href={info.originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`${info.openExternalLabel} (tab baru)`}
        aria-label={info.openExternalLabel}
        className="inline-flex items-center justify-center px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition"
      >
        ↗
      </a>
    </div>
  );
}
