import { supabase } from "../lib/supabaseClient";

// Interfaces for type safety
interface AddProductData {
  name: string;
  type: string;
  price: number;
  quantity: number;
  description: string;
}

export interface UpdateProductData {
  name?: string;
  type?: string;
  price?: number;
  quantity?: number;
  description?: string;
  isAvailable?: boolean;
}

interface RentProductData {
  quantity: number;
  startDate: string;
  endDate: string;
}

export interface Product {
  id?: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  description: string;
  isAvailable?: boolean;
  createdAt?: string;
}

interface RentProductResponse {
  rentProductId: string;
  productId: string;
  startDate: string;
  endDate: string;
  rentalPrice: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
}

// API function to add a product
export async function addProductApi(
  productData: AddProductData
): Promise<Product> {
  // Get user id from Supabase auth
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("يجب تسجيل الدخول لإضافة منتج");
  const { data, error } = await supabase
    .from("products")
    .insert([{ ...productData, user_id: user.id }])
    .select()
    .single();
  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("لم يتم إرجاع بيانات المنتج من Supabase");
  }
  return data;
}

// API function to get user's products
export async function getUserProductsApi(userId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error("Supabase error:", error.message);
    throw error;
  }
  return data;
}

// API function to update a product
export async function updateProductApi(
  productId: string,
  productData: UpdateProductData
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", productId)
    .select()
    .single();
  if (error) {
    console.error("Supabase error:", error.message);
    throw error;
  }
  return data;
}

// API function to delete a product
export async function deleteProductApi(productId: string): Promise<void> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);
  if (error) {
    console.error("Supabase error:", error.message);
    throw error;
  }
}

// API function to rent a product
export async function rentProductApi(
  productId: string,
  rentData: RentProductData
): Promise<RentProductResponse> {
  const { data, error } = await supabase
    .from("rents")
    .insert([{ productId, ...rentData }])
    .select()
    .single();
  if (error) {
    console.error("Supabase error:", error.message);
    throw error;
  }
  return data;
}

// Additional utility functions

// Function to check product availability before renting
export async function checkProductAvailability(
  productId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("products")
    .select("isAvailable, quantity")
    .eq("id", productId)
    .single();
  if (error) {
    console.error("Supabase error:", error.message);
    throw error;
  }
  return data.isAvailable && data.quantity > 0;
}
