import { supabase } from "./supabase";

/**
 * Les colonnes sont volontairement sélectionnées avec prudence.
 * Ajuster les projections après vérification du schéma réel Supabase.
 * Les règles RLS restent l'autorité de sécurité.
 */
export async function loadClientProfile(userId) {
  if (!supabase) throw new Error("Supabase n'est pas configuré.");
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function loadClientRecord(userId) {
  if (!supabase) throw new Error("Supabase n'est pas configuré.");
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function countRows(table, clientId) {
  if (!supabase) throw new Error("Supabase n'est pas configuré.");
  const { count, error } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("client_id", clientId);
  if (error) throw error;
  return count ?? 0;
}
