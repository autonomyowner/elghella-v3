import { supabase } from "../lib/supabaseClient";

// Updated interface for rent land data to include all properties
export interface RentLandData {
  landId?: string;
  location?: string;
  area?: number;
  soilType?: string;
  price?: number;
  description?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  isAvailable?: boolean;
  user_id?: string;
}

// Interface for land creation response
interface LandCreationResponse {
  landId: string;
  location: string;
  area: number;
  soilType: string;
  price: number;
  description?: string;
  isAvailable: boolean;
}

// Interface for retrieved user lands
interface UserLand {
  landId: string;
  location: string;
  area: number;
  soilType: string;
  price: number;
  description?: string;
  isAvailable: boolean;
}

// API function to add a new land
export async function addLandApi(
  landData: RentLandData
): Promise<LandCreationResponse> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لإضافة أرض");
  const { data, error } = await supabase
    .from("lands")
    .insert([{ ...landData, user_id: user.id }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return {
    landId: data.id,
    location: data.location,
    area: data.area,
    soilType: data.soilType,
    price: data.price,
    description: data.description,
    isAvailable: data.isAvailable,
  };
}

// API function to get user's lands
export async function getUserLandsApi(): Promise<UserLand[]> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لعرض أراضيك");
  const { data, error } = await supabase
    .from("lands")
    .select("*", { count: "exact" })
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);
  return (data || []).map((item: any) => ({
    landId: item.id,
    location: item.location,
    area: item.area,
    soilType: item.soilType,
    price: item.price,
    description: item.description,
    isAvailable: item.isAvailable,
  }));
}

// New API function to update a land
export async function updateLandApi(
  landId: string,
  landData: RentLandData
): Promise<UserLand> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لتحديث أرضك");
  const { data, error } = await supabase
    .from("lands")
    .update({ ...landData })
    .eq("id", landId)
    .eq("user_id", user.id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return {
    landId: data.id,
    location: data.location,
    area: data.area,
    soilType: data.soilType,
    price: data.price,
    description: data.description,
    isAvailable: data.isAvailable,
  };
}

// New API function to delete a land
export async function deleteLandApi(landId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لحذف أرضك");
  const { error } = await supabase
    .from("lands")
    .delete()
    .eq("id", landId)
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);
}

// API function to rent a land
export async function rentLandApi(
  rentData: RentLandData & {
    landId: string;
    startDate: string;
    endDate: string;
  }
): Promise<any> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لاستئجار أرض");
  const { data, error } = await supabase
    .from("land_rentals")
    .insert([
      {
        land_id: rentData.landId,
        user_id: user.id,
        start_date: rentData.startDate,
        end_date: rentData.endDate,
        status: "pending",
      },
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}
