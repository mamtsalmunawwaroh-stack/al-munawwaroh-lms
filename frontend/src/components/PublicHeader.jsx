import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';

export default function PublicHeader() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  const isBerita = location.pathname.startsWith('/berita');

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 min-w-0">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm shrink-0">
              AM
            </div>
            <div className="min-w-0">
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 block leading-none truncate">
                MA &amp; MTs Al-Munawwaroh
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate block mt-0.5">
                Jenjang MTs &amp; MA &bull; Portal Publik &amp; Manajemen Madrasah
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-2 pl-4 border-l border-slate-200 dark:border-slate-800">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                location.pathname === '/'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Beranda
            </Link>
            <Link
              to="/berita"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                isBerita
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Portal Berita &amp; Prestasi
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/berita"
            className="md:hidden inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition whitespace-nowrap"
          >
            Berita
          </Link>
          <ThemeSwitcher />
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition shadow-sm whitespace-nowrap"
            >
              Buka Dashboard ({isAdmin ? 'Admin' : 'User'}) &rarr;
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 dark:border-emerald-800 transition whitespace-nowrap"
            >
              Login Sistem
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

