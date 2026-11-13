-- Data contoh untuk development lokal MA & MTs Al-Munawwaroh (aman dijalankan ulang: hanya mengisi tabel yang masih kosong)

INSERT INTO bahan_ajar (mata_pelajaran, kelas, judul_rpp, link_drive)
SELECT v.mata_pelajaran, v.kelas, v.judul_rpp, v.link_drive
FROM (VALUES
  ('Fikih', 'VII (MTs)', 'Modul Ajar Thaharah dan Tata Cara Shalat Fardhu Kelas VII MTs', 'https://drive.google.com/file/d/1example-rpp-fikih-vii-mts/view'),
  ('Matematika', 'X (MA)', 'Modul Ajar Eksponen dan Logaritma Kurikulum Merdeka Kelas X MA', 'https://drive.google.com/file/d/1example-rpp-matematika-x-ma/view'),
  ('Bahasa Arab', 'XI (MA)', 'RPP Qiraah dan Qawaid Bahasa Arab Kelas XI MA', 'https://drive.google.com/file/d/1example-rpp-barab-xi-ma/view')
) AS v(mata_pelajaran, kelas, judul_rpp, link_drive)
WHERE NOT EXISTS (SELECT 1 FROM bahan_ajar);

INSERT INTO akreditasi (sub_bab, nama_dokumen, link_drive, keterangan)
SELECT v.sub_bab, v.nama_dokumen, v.link_drive, v.keterangan
FROM (VALUES
  ('Komponen 1 - Mutu Lulusan', 'Rekapitulasi Prestasi Akademik & Non-Akademik Siswa MTs dan MA 3 Tahun Terakhir', 'https://drive.google.com/file/d/1example-akreditasi-mutu-lulusan/view', 'File Excel & PDF bukti sertifikat KSM/OSN tingkat Kabupaten Merauke & Provinsi'),
  ('Komponen 2 - Proses Pembelajaran', 'Dokumen Supervisi Akademik Guru MTs & MA Semester Ganjil', 'https://drive.google.com/file/d/1example-akreditasi-supervisi/view', 'Sudah diverifikasi oleh Kepala Madrasah Al-Munawwaroh'),
  ('Komponen 4 - Manajemen Sekolah', 'RKM dan RKAM MA & MTs Al-Munawwaroh Tahun Ajaran Berjalan', 'https://drive.google.com/file/d/1example-akreditasi-rkam/view', 'Dokumen PDF bertanda tangan Komite & Kepala Madrasah')
) AS v(sub_bab, nama_dokumen, link_drive, keterangan)
WHERE NOT EXISTS (SELECT 1 FROM akreditasi);

INSERT INTO siswa (nisn, nama_lengkap, kelas, angkatan, link_kk_drive, link_akta_drive, catatan_berkas)
SELECT v.nisn, v.nama_lengkap, v.kelas, v.angkatan, v.link_kk_drive, v.link_akta_drive, v.catatan_berkas
FROM (VALUES
  ('0091234561', 'Ahmad Fauzan', 'VIII-A (MTs)', '2025', 'https://drive.google.com/file/d/1example-kk-fauzan/view', 'https://drive.google.com/file/d/1example-akta-fauzan/view', 'KK & Akta lengkap terverifikasi Wali Kelas MTs'),
  ('0089876542', 'Siti Nurhaliza', 'XI-IPA (MA)', '2025', 'https://drive.google.com/file/d/1example-kk-nurhaliza/view', '', 'Akta kelahiran sedang proses legalisir'),
  ('0075432189', 'Muhammad Rizky Pratama', 'XII-IPS (MA)', '2024', '', '', 'Belum mengunggah tautan KK & Akta')
) AS v(nisn, nama_lengkap, kelas, angkatan, link_kk_drive, link_akta_drive, catatan_berkas)
WHERE NOT EXISTS (SELECT 1 FROM siswa);

UPDATE siswa
SET link_kk_drive = 'https://drive.google.com/file/d/1example-kk-fauzan/view',
    link_akta_drive = 'https://drive.google.com/file/d/1example-akta-fauzan/view',
    catatan_berkas = 'KK & Akta lengkap terverifikasi Wali Kelas MTs'
WHERE nisn = '0091234561' AND COALESCE(link_kk_drive, '') = '';

UPDATE siswa
SET link_kk_drive = 'https://drive.google.com/file/d/1example-kk-nurhaliza/view',
    catatan_berkas = 'Akta kelahiran sedang proses legalisir'
WHERE nisn = '0089876542' AND COALESCE(link_kk_drive, '') = '';

INSERT INTO pernyataan_siswa (siswa_id, jenis_surat, link_drive_surat, link_youtube_video)
SELECT s.id, v.jenis_surat, v.link_drive_surat, v.link_youtube_video
FROM (VALUES
  ('0091234561', 'Surat Pernyataan Tata Tertib Santri & Siswa Baru (MTs)', 'https://drive.google.com/file/d/1example-surat-tatib-fauzan/view', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
  ('0089876542', 'Surat Pernyataan Komitmen Beasiswa Prestasi Madrasah (MA)', 'https://drive.google.com/file/d/1example-surat-beasiswa-nurhaliza/view', 'https://www.youtube.com/watch?v=9bZkp7q19f0')
) AS v(nisn, jenis_surat, link_drive_surat, link_youtube_video)
JOIN siswa s ON s.nisn = v.nisn
WHERE NOT EXISTS (SELECT 1 FROM pernyataan_siswa);

INSERT INTO berita_prestasi (judul, kategori, ringkasan, isi_konten, gambar_url, galeri_urls, nama_siswa_terkait, tingkat_prestasi, penulis, tanggal_publikasi, is_published)
SELECT v.judul, v.kategori, v.ringkasan, v.isi_konten, v.gambar_url, v.galeri_urls::jsonb, v.nama_siswa_terkait, v.tingkat_prestasi, v.penulis, v.tanggal_publikasi::date, v.is_published
FROM (VALUES
  (
    'Kontingen KSM MA & MTs Al-Munawwaroh Raih Juara 1 Kompetisi Sains Madrasah Kabupaten Merauke',
    'Prestasi Siswa',
    'Siswa MTs dan MA Al-Munawwaroh berhasil meraih juara pertama cabang Matematika Terintegrasi dan Biologi Terintegrasi pada ajang KSM 2026.',
    E'Kabar membanggakan datang dari kontingen Kompetisi Sains Madrasah (KSM) MA & MTs Al-Munawwaroh. Setelah melalui pembinaan intensif bersama asatidz dan guru pembimbing, Ahmad Fauzan (VIII-A MTs) dan Siti Nurhaliza (XI-IPA MA) berhasil menempati peringkat pertama tingkat Kabupaten Merauke.\n\nKepala Madrasah menyampaikan apresiasi setinggi-tingginya kepada para peserta didik, wali murid, serta dewan guru atas dedikasi dan istiqamah dalam belajar.\n\nSelanjutnya, perwakilan madrasah akan dipersiapkan menuju seleksi tingkat Provinsi Papua Selatan.',
    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80", "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"]',
    'Ahmad Fauzan (VIII-A MTs) & Siti Nurhaliza (XI-IPA MA)',
    'Tingkat Kabupaten Merauke',
    'Tim Humas Al-Munawwaroh',
    '2026-11-08',
    true
  ),
  (
    'Dokumentasi Digitalisasi Tata Kelola Arsip Madrasah Terpadu untuk Jenjang MTs dan MA',
    'Dokumentasi Kegiatan',
    'Implementasi portal sistem informasi manajemen madrasah terpadu untuk mendukung administrasi perangkat ajar, akreditasi, data siswa, dan alumni tracker.',
    E'MA & MTs Al-Munawwaroh melaksanakan penguatan kapasitas pendidik serta digitalisasi tata kelola arsip akademik secara terpadu antara jenjang Madrasah Tsanawiyah (MTs) dan Madrasah Aliyah (MA).\n\nKegiatan ini mencakup penataan modul ajar RPP berbasis cloud, pemetaan data induk siswa, dokumentasi bukti fisik akreditasi madrasah, hingga pelacakan lulusan (alumni tracker) agar seluruh arsip tersimpan aman dan mudah diakses dewan guru.',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"]',
    'Dewan Guru & Staf TU Al-Munawwaroh',
    'Internal Madrasah',
    'Admin Portal Madrasah',
    '2026-11-05',
    true
  ),
  (
    'Persiapan Penilaian Akhir Semester & Penguatan Program Tahfidz Jenjang MTs dan MA',
    'Berita Madrasah',
    'Dewan guru MA & MTs Al-Munawwaroh menggelar rapat koordinasi pelaksanaan asesmen semester ganjil sekaligus evaluasi program tahfidz Al-Quran.',
    E'Menjelang pelaksanaan asesmen akhir semester ganjil, pimpinan beserta seluruh dewan guru MA dan MTs Al-Munawwaroh melaksanakan rapat koordinasi akademik di aula madrasah.\n\nSelain pemantapan kisi-kisi soal berbasis literasi dan numerasi, madrasah juga mengevaluasi capaian hafalan juz siswa jenjang MTs dan MA guna memastikan keseimbangan kompetensi sains dan pendidikan karakter islami.',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    '[]',
    'Seluruh Siswa MTs & MA Al-Munawwaroh',
    'Tingkat Madrasah',
    'Bidang Kurikulum',
    '2026-10-28',
    true
  )
) AS v(judul, kategori, ringkasan, isi_konten, gambar_url, galeri_urls, nama_siswa_terkait, tingkat_prestasi, penulis, tanggal_publikasi, is_published)
WHERE NOT EXISTS (SELECT 1 FROM berita_prestasi);

INSERT INTO guru (nip, nuptk, nama_lengkap, jenis_kelamin, jabatan, mata_pelajaran, status_kepegawaian, pendidikan_terakhir, no_hp, email, status_aktif)
SELECT v.nip, v.nuptk, v.nama_lengkap, v.jenis_kelamin, v.jabatan, v.mata_pelajaran, v.status_kepegawaian, v.pendidikan_terakhir, v.no_hp, v.email, v.status_aktif
FROM (VALUES
  ('197705142005011005', '4744756657200012', 'H. Abdul Rahman, M.Pd.I', 'Laki-laki', 'Kepala Madrasah', 'Manajemen Pendidikan Islam / Fikih', 'PNS', 'S2', '0812-4800-2101', 'kamad@almunawwaroh.sch.id', 'Aktif'),
  ('198609152014032004', '8247764665300023', 'Ustadzah Siti Khadijah, S.Pd', 'Perempuan', 'Waka Kurikulum (MTs & MA)', 'Matematika', 'PNS', 'S1', '0812-4800-2102', 'siti.khadijah@almunawwaroh.sch.id', 'Aktif'),
  ('199103212022211007', '6653769670130041', 'Muhammad Yusuf Al-Farisi, S.Ag', 'Laki-laki', 'Guru Bahasa Arab & Pembina Tahfidz', 'Bahasa Arab / Al-Quran Hadits', 'PPPK', 'S1', '0813-5520-2203', 'yusuf.alfarisi@almunawwaroh.sch.id', 'Aktif'),
  ('-', '2145771672130088', 'Nurul Hidayah, S.Pd', 'Perempuan', 'Wali Kelas VII-A (MTs)', 'IPA Terpadu / Biologi', 'GTT / Honorer', 'S1', '0821-9910-3304', 'nurul.hidayah@almunawwaroh.sch.id', 'Aktif')
) AS v(nip, nuptk, nama_lengkap, jenis_kelamin, jabatan, mata_pelajaran, status_kepegawaian, pendidikan_terakhir, no_hp, email, status_aktif)
WHERE NOT EXISTS (SELECT 1 FROM guru);

INSERT INTO sarana_prasarana (kode_aset, nama_sarpras, kategori, jumlah, satuan, kondisi, lokasi, tahun_pengadaan, keterangan)
SELECT v.kode_aset, v.nama_sarpras, v.kategori, v.jumlah, v.satuan, v.kondisi, v.lokasi, v.tahun_pengadaan, v.keterangan
FROM (VALUES
  ('SRP-001', 'Ruang Kelas Belajar (RKB) Jenjang MTs & MA', 'Ruang & Bangunan', 12, 'Ruang', 'Baik', 'Gedung MTs & Gedung MA Al-Munawwaroh', '2021', '6 ruang jenjang MTs (VII-IX) dan 6 ruang jenjang MA (X-XII)'),
  ('SRP-002', 'Komputer Laboratorium TIK & Asesmen (ANBK)', 'Peralatan Lab & TIK', 24, 'Unit', 'Baik', 'Ruang Lab Komputer Madrasah', '2024', 'Siap pakai untuk AKMI, ANBK MTs/MA, dan ujian berbasis komputer'),
  ('SRP-003', 'Perangkat Praktikum IPA Terpadu (MTs & MA)', 'Peralatan Lab & TIK', 6, 'Set', 'Rusak Ringan', 'Laboratorium IPA', '2020', 'Beberapa alat gelas ukur perlu peremajaan berkala'),
  ('SRP-004', 'Meja & Kursi Belajar Siswa Standar Madrasah', 'Mebelair Kelas', 280, 'Set', 'Baik', 'Seluruh Ruang Kelas MTs & MA', '2022', 'Kondisi kokoh dan layak pakai'),
  ('SRP-005', 'Mushalla / Masjid & Lapangan Upacara Madrasah', 'Fasilitas Ibadah & Ekstrakurikuler', 1, 'Paket', 'Baik', 'Kompleks Tengah Al-Munawwaroh', '2020', 'Digunakan bersama untuk pembinaan ibadah dan kegiatan ekstrakurikuler MTs & MA')
) AS v(kode_aset, nama_sarpras, kategori, jumlah, satuan, kondisi, lokasi, tahun_pengadaan, keterangan)
WHERE NOT EXISTS (SELECT 1 FROM sarana_prasarana);

INSERT INTO alumni (nisn, nama_lengkap, angkatan_lulus, jurusan, status_lulusan, instansi_tujuan, bidang_jurusan, kota, no_hp, email, link_ijazah_drive, keterangan)
SELECT v.nisn, v.nama_lengkap, v.angkatan_lulus, v.jurusan, v.status_lulusan, v.instansi_tujuan, v.bidang_jurusan, v.kota, v.no_hp, v.email, v.link_ijazah_drive, v.keterangan
FROM (VALUES
  ('0054123901', 'Ahmad Zaki Mubarok', '2025', 'MA IPA', 'Kuliah', 'UIN Sunan Kalijaga / Universitas Musamus', 'S1 Pendidikan Matematika', 'Yogyakarta / Merauke', '0812-4401-7788', 'zaki.m@alumni.almunawwaroh.sch.id', 'https://drive.google.com/file/d/1example-ijazah-zaki/view', 'Lulusan MA penerima beasiswa prestasi'),
  ('0083981202', 'Aisyah Putri Ramadhani', '2025', 'MTs', 'Lanjut Sekolah / Pondok', 'MA Al-Munawwaroh', 'Kelas X Jurusan Keagamaan / IPA', 'Merauke', '0813-7788-2211', 'aisyah.p@alumni.almunawwaroh.sch.id', 'https://drive.google.com/file/d/1example-ijazah-aisyah/view', 'Lulusan MTs melanjutkan ke jenjang MA di madrasah yang sama'),
  ('0049821303', 'Fajar Hidayatullah', '2024', 'MA IPS', 'Bekerja', 'Koperasi Syariah Mandiri Merauke', 'Staf Administrasi Keuangan', 'Merauke', '0821-8899-4455', 'fajar.h@gmail.com', 'https://drive.google.com/file/d/1example-ijazah-fajar/view', 'Ijazah & SKL sudah diambil dan diarsipkan'),
  ('0047712304', 'Khadijah Azzahra', '2024', 'MA Keagamaan', 'Wirausaha', 'Usaha Busana Muslimah & Katering', 'Pengelola Usaha Mandiri', 'Merauke', '0852-1122-3344', '', '', 'Ijazah fisik tersimpan di TU, link menyusul')
) AS v(nisn, nama_lengkap, angkatan_lulus, jurusan, status_lulusan, instansi_tujuan, bidang_jurusan, kota, no_hp, email, link_ijazah_drive, keterangan)
WHERE NOT EXISTS (SELECT 1 FROM alumni);
