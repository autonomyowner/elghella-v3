import React, { useEffect, useRef, useState } from "react";
import { Message, sendMessage } from "../api/messagesApi";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

interface ChatBoxProps {
  otherUserId: string;
  postId: string;
  postType: string;
  onClose: () => void;
}

interface UserProfile {
  userId: string;
  name?: string;
  email?: string;
}

function getInitials(name?: string, email?: string) {
  if (name) return name.slice(0, 2).toUpperCase();
  if (email) return email.slice(0, 2).toUpperCase();
  return "??";
}

export default function ChatBox({ otherUserId, postId, postType, onClose }: ChatBoxProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otherUser, setOtherUser] = useState<UserProfile | null>(null);
  const [typing, setTyping] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const typingChannel = useRef<any>(null);

  // Fetch chat messages for this post between these two users
  const fetchChat = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`(sender_id.eq.${user?.userId},receiver_id.eq.${otherUserId}),(sender_id.eq.${otherUserId},receiver_id.eq.${user?.userId})`)
        .eq("post_id", postId)
        .order("created_at", { ascending: true });
      if (error) {
        setMessages([]);
        setError("لا توجد رسائل أو لا يوجد اتصال بالخادم");
        setLoading(false);
        return;
      }
      setMessages(data || []);
    } catch (err) {
      setMessages([]);
      setError("لا توجد رسائل أو لا يوجد اتصال بالخادم");
    }
    setLoading(false);
  };

  // Fetch other user profile (with live updates)
  useEffect(() => {
    let isMounted = true;
    const fetchOtherUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, name, email")
        .eq("id", otherUserId)
        .single();
      if (!error && data && isMounted) {
        setOtherUser({ userId: data.id, name: data.name, email: data.email });
      } else if (isMounted) {
        setOtherUser({ userId: otherUserId });
      }
    };
    fetchOtherUser();
    // Subscribe to user changes for live updates
    const userChannel = supabase
      .channel(`user-profile-${otherUserId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users', filter: `id=eq.${otherUserId}` }, (payload: { new?: any }) => {
        if (payload.new && isMounted) {
          setOtherUser({ userId: payload.new.id, name: payload.new.name, email: payload.new.email });
        }
      })
      .subscribe();
    return () => {
      isMounted = false;
      supabase.removeChannel(userChannel);
    };
  }, [otherUserId]);

  useEffect(() => {
    fetchChat();
    // Subscribe to new messages in real time
    const channel = supabase
      .channel('chat-messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
        const msg = payload.new as Message;
        if (
          (msg.sender_id === user?.userId && msg.receiver_id === otherUserId && msg.post_id === postId) ||
          (msg.sender_id === otherUserId && msg.receiver_id === user?.userId && msg.post_id === postId)
        ) {
          fetchChat();
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line
  }, [user, otherUserId, postId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Typing indicator logic (basic, not persistent)
  useEffect(() => {
    if (!typing) return;
    const timeout = setTimeout(() => setTyping(false), 2000);
    return () => clearTimeout(timeout);
  }, [typing]);

  // Simulate other user typing (for demo, not real-time)
  useEffect(() => {
    if (!isOtherTyping) return;
    const timeout = setTimeout(() => setIsOtherTyping(false), 1500);
    return () => clearTimeout(timeout);
  }, [isOtherTyping]);

  // Subscribe to typing events
  useEffect(() => {
    typingChannel.current = supabase.channel(`typing-${postId}-${user?.userId}-${otherUserId}`);
    typingChannel.current
      .on('broadcast', { event: 'typing' }, (payload: any) => {
        if (payload.payload.userId === otherUserId) {
          setIsOtherTyping(true);
        }
      })
      .subscribe();
    return () => {
      if (typingChannel.current) supabase.removeChannel(typingChannel.current);
    };
  }, [user, otherUserId, postId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setTyping(true);
    // Broadcast typing event
    typingChannel.current?.send({
      type: 'broadcast',
      event: 'typing',
      payload: { userId: user?.userId },
    });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    try {
      await sendMessage({
        sender_id: user!.userId!,
        receiver_id: otherUserId,
        post_id: postId,
        post_type: postType,
        content: input.trim(),
      });
      setInput("");
    } catch (err) {
      setError("فشل إرسال الرسالة");
    }
    setSending(false);
  };

  // Clear chat history function
  const clearChatHistory = async () => {
    try {
      await supabase
        .from("messages")
        .delete()
        .or(`(sender_id.eq.${user?.userId},receiver_id.eq.${otherUserId}),(sender_id.eq.${otherUserId},receiver_id.eq.${user?.userId})`)
        .eq("post_id", postId);
      setMessages([]);
    } catch (err) {
      setError("فشل حذف المحادثة");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md flex flex-col h-[80vh]">
        {/* Header image */}
        <img
          src="https://elghella-v3-omega.vercel.app/assets/about-us-eWafbHQl.svg"
          alt="About Us"
          className="w-full h-32 object-cover rounded-t-lg mb-2"
        />
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
                {getInitials(otherUser?.name, otherUser?.email)}
              </div>
              <h3 className="text-lg font-bold text-white">{otherUser?.email || "مستخدم"}</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-400 text-lg">✕</button>
        </div>
        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-800">
          {loading ? (
            <div className="text-center text-gray-400">جاري تحميل الرسائل...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400">لا توجد رسائل بعد</div>
          ) : (
            messages.map((msg, i) => {
              const isSender = msg.sender_id === user?.userId;
              return (
                <div
                  key={msg.id || i}
                  className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex flex-col items-${isSender ? "end" : "start"} max-w-xs w-fit`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
                        {isSender ? getInitials(user?.name, user?.email) : getInitials(otherUser?.name, otherUser?.email)}
                      </div>
                      <span className="text-xs text-gray-300">{isSender ? user?.email : otherUser?.email}</span>
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 break-words shadow text-base font-['NeoSansArabicRegular'] ${
                        isSender ? "bg-green-600 text-white" : "bg-gray-700 text-white"
                      }`}
                      style={{ borderBottomRightRadius: isSender ? 0 : 16, borderBottomLeftRadius: isSender ? 16 : 0 }}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {isOtherTyping && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
                {getInitials(otherUser?.name, otherUser?.email)}
              </div>
              <div className="bg-gray-700 text-white px-3 py-1 rounded-lg text-xs animate-pulse">يكتب...</div>
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-gray-800 flex gap-2 bg-gray-900">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-1 px-4 py-3 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
            placeholder="اكتب رسالة..."
            disabled={sending}
            dir="rtl"
            autoFocus
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold disabled:opacity-50 text-base shadow-lg"
            disabled={sending || !input.trim()}
          >
            إرسال
          </button>
        </form>
        <button
          onClick={clearChatHistory}
          className="text-xs text-red-400 hover:text-red-600 ml-2 border border-red-400 px-2 py-1 rounded"
          type="button"
        >
          حذف المحادثة
        </button>
        {error && <div className="mt-2 text-red-400 text-sm">{error}</div>}
      </div>
    </div>
  );
}
