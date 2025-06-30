import React, { useEffect, useState } from "react";
import { getMessagesForUser, Message } from "../api/messagesApi";
import { useAuth } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";
import { supabase } from "../lib/supabaseClient";

// Helper to group messages by conversation (other user + post)
function groupConversations(messages: Message[], userId: string) {
  const map = new Map<string, Message>();
  messages.forEach((msg) => {
    const otherUserId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
    const key = `${otherUserId}-${msg.post_id || ''}-${msg.post_type || ''}`;
    const existing = map.get(key);
    if (!existing || (msg.created_at && (!existing.created_at || existing.created_at < msg.created_at))) {
      map.set(key, msg);
    }
  });
  return Array.from(map.values());
}

function getInitials(email?: string) {
  if (!email) return "??";
  return email.slice(0, 2).toUpperCase();
}

// Fetch user email by userId
function useUserEmails(userIds: string[]) {
  const [emails, setEmails] = useState<Record<string, string>>({});
  useEffect(() => {
    let isMounted = true;
    async function fetchEmails() {
      if (userIds.length === 0) return;
      const { data, error } = await supabase
        .from("users")
        .select("id, email")
        .in("id", userIds);
      if (!error && data && isMounted) {
        const map: Record<string, string> = {};
        data.forEach((u: any) => { map[u.id] = u.email; });
        setEmails(map);
      }
    }
    fetchEmails();
    return () => { isMounted = false; };
  }, [userIds.join(",")]);
  return emails;
}

export default function Inbox() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatWith, setChatWith] = useState<null | { otherUserId: string; postId: string; postType: string }>(null);
  const [fatal, setFatal] = useState<string | null>(null);

  // Error boundary for unexpected errors
  React.useEffect(() => {
    // Remove unused variables 'url', 'line', 'col' from window.onerror
    window.onerror = (msg, _url, _line, _col, err) => {
      setFatal(String(msg) + (err ? (": " + err.message) : ""));
      return false;
    };
    return () => { window.onerror = null; };
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getMessagesForUser(user.userId!)
      .then((msgs) => {
        setMessages(msgs || []);
        setLoading(false);
      })
      .catch((e) => {
        setError("فشل تحميل الرسائل");
        setLoading(false);
        setFatal(e?.message || String(e));
      });
  }, [user]);

  // Group by conversation (other user + post)
  const conversations = user ? groupConversations(messages, user.userId!) : [];
  // Always call hooks at the top level
  const otherUserIds = conversations.map((msg) => msg.sender_id === user?.userId ? msg.receiver_id : msg.sender_id);
  const emails = useUserEmails(otherUserIds);

  if (!user) return <div className="text-center mt-10">يرجى تسجيل الدخول لعرض الرسائل</div>;
  if (fatal) return <div className="text-center mt-10 text-red-500">خطأ غير متوقع: {fatal}</div>;
  if (loading) return <div className="text-center mt-10">جاري تحميل الرسائل...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  if (conversations.length === 0) {
    return <div className="text-center mt-10">لا توجد محادثات بعد</div>;
  }

  return (
    <section className="py-16 md:py-20 text-right dir-rtl font-['NeoSansArabicRegular']">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold mb-8 text-white">صندوق الدردشة</h2>
        <div className="bg-gray-900 rounded-lg shadow-lg divide-y divide-gray-800">
          {conversations.map((msg, idx) => {
            const isSender = msg.sender_id === user.userId;
            const otherUserId = isSender ? msg.receiver_id : msg.sender_id;
            const otherUserEmail = emails[otherUserId];
            return (
              <button
                key={msg.id || idx}
                className="w-full flex items-center gap-4 py-5 px-6 hover:bg-gray-800 transition text-right focus:outline-none"
                onClick={() => setChatWith({
                  otherUserId,
                  postId: msg.post_id,
                  postType: msg.post_type
                })}
              >
                <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white text-lg font-bold">
                  {getInitials(otherUserEmail)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white truncate">{otherUserEmail || "مستخدم"}</div>
                  <div className="text-gray-300 truncate mt-1">{msg.content}</div>
                </div>
                <span className="ml-2 text-xs text-gray-500 font-['NeoSansArabicRegular']">{isSender ? "(أنت)" : ""}</span>
              </button>
            );
          })}
        </div>
        {chatWith && (
          <ChatBox
            otherUserId={chatWith.otherUserId}
            postId={chatWith.postId}
            postType={chatWith.postType}
            onClose={() => setChatWith(null)}
          />
        )}
      </div>
    </section>
  );
}
