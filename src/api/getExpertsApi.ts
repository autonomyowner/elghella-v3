import supabase from "../config/supabaseClient";

export async function getExpertsApi() {
  const { data, error } = await supabase
    .from("experts")
    .select("id, name, prename, wilaya, skills, description, email, phone, image_url, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error("فشل جلب قائمة الخبراء: " + error.message);
  return data;
}
