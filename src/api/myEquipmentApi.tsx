import { supabase } from "../lib/supabaseClient";

// Updated interface for rent equipment data to include all properties
export interface RentEquipmentData {
  equipmentId?: string;
  name?: string;
  type?: string;
  condition?: "NEW" | "USED" | "REFURBISHED" | "DAMAGED";
  price?: number;
  description?: string;
  startDate?: string;
  endDate?: string;
  isAvailable?: boolean;
  images?: string[]; // Add images field for image URLs
  user_id?: string; // For associating with user
}

// Interface for equipment creation response
interface EquipmentCreationResponse {
  equipmentId: string;
  name: string;
  type: string;
  condition: "NEW" | "USED" | "REFURBISHED" | "DAMAGED";
  price: number;
  description?: string;
  isAvailable: boolean;
  images?: string[];
}

// Interface for retrieved user equipment
interface UserEquipment {
  equipmentId: string;
  name: string;
  type: string;
  condition: "NEW" | "USED" | "REFURBISHED" | "DAMAGED";
  price: number;
  description?: string;
  isAvailable: boolean;
  images?: string[];
}

// Add equipment to Supabase
export async function addEquipmentApi(
  equipmentData: RentEquipmentData
): Promise<EquipmentCreationResponse> {
  // Get user id from Supabase auth
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لإضافة معدات");
  const { data, error } = await supabase
    .from("equipments")
    .insert([{ ...equipmentData, user_id: user.id }])
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return {
    equipmentId: data.id,
    name: data.name,
    type: data.type,
    condition: data.condition,
    price: data.price,
    description: data.description,
    isAvailable: data.isAvailable,
    images: data.images || [],
  };
}

// Get all equipment for the current user
export async function getUserEquipmentApi(): Promise<UserEquipment[]> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لعرض معداتك");
  const { data, error } = await supabase
    .from("equipments")
    .select("*", { count: "exact" })
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);
  return (data || []).map((item: any) => ({
    equipmentId: item.id,
    name: item.name,
    type: item.type,
    condition: item.condition,
    price: item.price,
    description: item.description,
    isAvailable: item.isAvailable,
    images: item.images || [],
  }));
}

// Update equipment by id (only if owned by user)
export async function updateEquipmentApi(
  equipmentId: string,
  equipmentData: RentEquipmentData
): Promise<EquipmentCreationResponse> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لتحديث معداتك");
  const { data, error } = await supabase
    .from("equipments")
    .update({ ...equipmentData })
    .eq("id", equipmentId)
    .eq("user_id", user.id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return {
    equipmentId: data.id,
    name: data.name,
    type: data.type,
    condition: data.condition,
    price: data.price,
    description: data.description,
    isAvailable: data.isAvailable,
    images: data.images || [],
  };
}

// Delete equipment by id (only if owned by user)
export async function deleteEquipmentApi(equipmentId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لحذف معداتك");
  const { error } = await supabase
    .from("equipments")
    .delete()
    .eq("id", equipmentId)
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);
}

// Rent equipment (creates a row in 'equipment_rentals' table)
export async function rentEquipmentApi(
  rentData: RentEquipmentData & {
    equipmentId: string;
    startDate: string;
    endDate: string;
  }
): Promise<any> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لاستئجار معدات");
  // Insert rental record
  const { data, error } = await supabase
    .from("equipment_rentals")
    .insert([
      {
        equipment_id: rentData.equipmentId,
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
