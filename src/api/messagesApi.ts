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
  // Validate sender_id and receiver_id
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!message.sender_id || !uuidRegex.test(message.sender_id)) {
    throw new Error("معرّف المرسل غير صالح (sender_id must be a valid UUID)");
  }
  if (!message.receiver_id || !uuidRegex.test(message.receiver_id)) {
    throw new Error("معرّف المستلم غير صالح (receiver_id must be a valid UUID)");
  }
  if (!message.content || !message.content.trim()) {
    throw new Error("لا يمكن إرسال رسالة فارغة");
  }
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
