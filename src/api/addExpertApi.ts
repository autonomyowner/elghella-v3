import supabase from "../config/supabaseClient";

export async function addExpertApi({
  name,
  prename,
  wilaya,
  skills,
  description,
  email,
  phone,
  image,
}: {
  name: string;
  prename: string;
  wilaya: string;
  skills: string;
  description: string;
  email: string;
  phone: string;
  image: File;
}) {
  // 1. Upload image to Supabase Storage
  const fileExt = image.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const { error: storageError } = await supabase.storage
    .from("experts")
    .upload(fileName, image);
  if (storageError) throw new Error("فشل رفع الصورة: " + storageError.message);

  // 2. Get public URL
  const { data: publicUrlData } = supabase.storage.from("experts").getPublicUrl(fileName);
  const image_url = publicUrlData.publicUrl;

  // 3. Insert expert data into DB
  const { data, error } = await supabase.from("experts").insert([
    {
      name,
      prename,
      wilaya,
      skills,
      description,
      email,
      phone,
      image_url,
    },
  ]);
  if (error) throw new Error("فشل حفظ بيانات الخبير: " + error.message);
  return data;
}
