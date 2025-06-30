import { supabase } from "../lib/supabaseClient";

// Message interface
export interface Message {
  id?: string;
  sender_id: string;
  receiver_id: string;
  post_id: string;
  post_type: string; // 'product' | 'equipment' | 'land'
  content: string;
  created_at?: string;
}

// Send a message
export async function sendMessage(message: Omit<Message, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("messages")
    .insert([message])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Get messages for a user (as receiver or sender)
export async function getMessagesForUser(userId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}
