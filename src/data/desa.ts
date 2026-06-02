import { supabase } from "./client";

// Correct Supabase Storage public URL format:
// /storage/v1/object/public/<bucket>/<path>
const STORAGE_BASE =
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets`;

const toUrl = (path?: string | null): string => {
  if (!path) return "";
  // Already a full URL, return as-is
  if (path.startsWith("http")) return path;
  // Strip leading "assets/" prefix if stored that way in the DB
  const cleaned = path.replace(/^assets\//, "");
  return `${STORAGE_BASE}/${cleaned}`;
};

export interface Anggota {
  id: number;
  desa_id: number;
  nama: string;
  nim: string;
  prodi: string;
  role: "dpl" | "kormanit" | "kormasit" | "anggota";
  jabatan: string;
  foto: string;
}

export interface DesaDataItem {
  id: number;
  namaDesa: string;
  deskripsi: string;
  deskripsiGeografis: string;
  fotoGeografis: string;
  fotoBersama: string[];
  reverse: boolean;
  color: string;
  icon: string;
  highlight: string;
  programCount: number;
  umkmCount: number;

  koordinator: {
    nama: string;
    jabatan: string;
    foto: string;
    prodi: string;
    nim: string;
  };

  anggota: {
    id: number;
    nama: string;
    nim: string;
    prodi: string;
    jabatan: string;
    foto: string;
  }[];
}

export async function fetchDesaWithAnggota(): Promise<DesaDataItem[]> {
  const [
    { data: desaRows, error: desaError },
    { data: anggotaRows, error: anggotaError },
  ] = await Promise.all([
    supabase.from("desa").select("*").order("id", { ascending: true }),
    supabase.from("anggota").select("*"),
  ]);

  if (desaError) {
    console.error("[fetchDesaWithAnggota] desa error:", desaError);
    throw desaError;
  }
  if (anggotaError) {
    console.error("[fetchDesaWithAnggota] anggota error:", anggotaError);
    throw anggotaError;
  }

  // Guard: supabase returns null (not []) when RLS blocks all rows
  if (!desaRows || desaRows.length === 0) {
    console.warn("[fetchDesaWithAnggota] desa table returned no rows — check RLS policies.");
    return [];
  }

  return desaRows.map((desa) => {
    const anggotaDesa = (anggotaRows ?? []).filter(
      (a) => a.desa_id === desa.id && a.role !== "dpl"
    );

    const koordinator =
      anggotaDesa.find((a) => a.role === "kormasit") ??
      anggotaDesa.find((a) => a.role === "kormanit") ??
      anggotaDesa[0];

    return {
      id: desa.id,
      namaDesa: desa.nama_desa,
      deskripsi: desa.deskripsi,
      deskripsiGeografis: desa.deskripsi_geografis,
      fotoGeografis: toUrl(desa.foto_geografis),
      fotoBersama: (desa.foto_bersama ?? []).map(toUrl),
      reverse: desa.reverse ?? false,
      color: desa.color ?? "blue",
      icon: desa.icon ?? "📍",
      highlight: desa.highlight ?? "",
      programCount: desa.program_count ?? 0,
      umkmCount: desa.umkm_count ?? 0,
      koordinator: {
        nama: koordinator?.nama ?? "-",
        jabatan: koordinator?.jabatan ?? "-",
        foto: toUrl(koordinator?.foto),
        prodi: koordinator?.prodi ?? "-",
        nim: koordinator?.nim ?? "-",
      },
      anggota: anggotaDesa
        .filter((a) => a.role === "anggota")
        .map((a) => ({
          id: a.id,
          nama: a.nama,
          nim: a.nim,
          prodi: a.prodi,
          jabatan: a.jabatan,
          foto: toUrl(a.foto),
        })),
    };
  });
}

export async function fetchPimpinan() {
  const { data, error } = await supabase.from("anggota").select("*");

  if (error) {
    console.error("[fetchPimpinan] error:", error);
    throw error;
  }

  return {
    dpl: data?.find((a) => a.role === "dpl") ?? null,
    kormanit: data?.find((a) => a.role === "kormanit") ?? null,
  };
}