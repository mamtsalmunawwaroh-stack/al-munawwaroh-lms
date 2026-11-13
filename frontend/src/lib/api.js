import { supabase, isSupabaseConfigured } from './supabaseClient';

function resolveApiUrl() {
  const configured = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLoopback = host === 'localhost' || host === '127.0.0.1' || host === '::1';
    if (!isLoopback) {
      try {
        const parsed = new URL(configured);
        if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
          parsed.hostname = host;
          return parsed.toString().replace(/\/$/, '');
        }
      } catch {
        return `http://${host}:5001/api`;
      }
    }
  }
  return configured;
}

const API_URL = resolveApiUrl();

function getCurrentUserRole() {
  try {
    const saved = localStorage.getItem('almunawwaroh_auth_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.role || 'user';
    }
  } catch (e) {
    console.error(e);
  }
  return 'user';
}

/**
 * Helper terpadu untuk mengambil & memanipulasi data:
 * - Jika Supabase sudah dikonfigurasi di .env -> gunakan Supabase PostgreSQL
 * - Jika belum (mode localhost sekarang) -> gunakan Backend Express API (http://localhost:5001/api)
 */
export const dataService = {
  async getAll(table) {
    if (isSupabaseConfigured && supabase) {
      const selectQuery = table === 'pernyataan_siswa' ? '*, siswa(*)' : '*';
      let query = supabase.from(table).select(selectQuery);
      if (table === 'berita_prestasi') {
        query = query
          .order('tanggal_publikasi', { ascending: false })
          .order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    }

    const res = await fetch(`${API_URL}/${table}`, {
      headers: {
        'x-user-role': getCurrentUserRole()
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Gagal memuat data dari server lokal.');
    }
    return res.json();
  },

  async getPublicNews() {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('berita_prestasi')
        .select('*')
        .eq('is_published', true)
        .order('tanggal_publikasi', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data || [];
    }

    const res = await fetch(`${API_URL}/berita_prestasi?published=true`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Gagal memuat berita dari server lokal.');
    }
    return res.json();
  },

  async getById(table, id) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    const res = await fetch(`${API_URL}/${table}/${id}`, {
      headers: {
        'x-user-role': getCurrentUserRole()
      }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Data tidak ditemukan.');
    }
    return data;
  },

  async create(table, payload) {
    if (isSupabaseConfigured && supabase) {
      const selectQuery = table === 'pernyataan_siswa' ? '*, siswa(*)' : '*';
      const { data, error } = await supabase
        .from(table)
        .insert([payload])
        .select(selectQuery)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    const res = await fetch(`${API_URL}/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': getCurrentUserRole()
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Gagal menyimpan data.');
    }
    return data;
  },

  async update(table, id, payload) {
    if (isSupabaseConfigured && supabase) {
      const selectQuery = table === 'pernyataan_siswa' ? '*, siswa(*)' : '*';
      const { data, error } = await supabase
        .from(table)
        .update(payload)
        .eq('id', id)
        .select(selectQuery)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    const res = await fetch(`${API_URL}/${table}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': getCurrentUserRole()
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Gagal memperbarui data.');
    }
    return data;
  },

  /**
   * Menyimpan banyak baris sekaligus (dipakai untuk impor CSV).
   * Baris dengan nilai unik yang sudah ada (mis. NISN) dilewati, bukan menggagalkan semua.
   * @returns {{ inserted: number, skipped: number }}
   */
  async createMany(table, rows) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from(table)
        .upsert(rows, { onConflict: 'nisn', ignoreDuplicates: true })
        .select('id');
      if (error) throw new Error(error.message);
      const inserted = data ? data.length : 0;
      return { inserted, skipped: rows.length - inserted };
    }

    const res = await fetch(`${API_URL}/${table}/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': getCurrentUserRole()
      },
      body: JSON.stringify({ rows })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Gagal mengimpor data.');
    }
    return data;
  },

  async remove(table, id) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    }

    const res = await fetch(`${API_URL}/${table}/${id}`, {
      method: 'DELETE',
      headers: {
        'x-user-role': getCurrentUserRole()
      }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Gagal menghapus data.');
    }
    return true;
  }
};
