import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button, useTheme, Avatar, Dialog, Portal, TextInput } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { useThemeSwitcher } from '../App';
import { useNavigation } from '@react-navigation/native';

function MessageItem({ message, userId }: { message: any; userId: string }) {
  const isSent = message.sender_id === userId;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontWeight: 'bold', color: isSent ? '#388e3c' : '#1976d2' }}>
        {isSent ? 'أرسلت إلى' : 'من'}: {isSent ? message.receiver_id : message.sender_id}
      </Text>
      <Text style={{ color: '#444' }}>{message.content}</Text>
      <Text style={{ fontSize: 12, color: '#888' }}>{new Date(message.created_at).toLocaleString()}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user, logout, refreshUser } = useAuth();
  const [editVisible, setEditVisible] = useState(false);
  const [newName, setNewName] = useState(user?.user_metadata?.display_name || '');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const { isDark, toggleTheme } = useThemeSwitcher();
  const navigation = useNavigation();

  // Try to get display name from user metadata
  const displayName = user?.user_metadata?.display_name || 'مستخدم بدون اسم';
  // Use initials for avatar if possible
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ data: { display_name: newName } });
    setLoading(false);
    if (!error) {
      setEditVisible(false);
      refreshUser && refreshUser();
    } else {
      alert('حدث خطأ أثناء تحديث الاسم');
    }
  };

  useEffect(() => {
    if (user?.id) {
      setMessagesLoading(true);
      supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(5)
        .then(({ data, error }) => {
          if (!error && data) setMessages(data);
          setMessagesLoading(false);
        });
    }
  }, [user]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <View style={{ position: 'absolute', top: 40, right: 24 }}>
        <Button mode="outlined" onPress={toggleTheme}>
          {isDark ? 'وضع النهار' : 'وضع الليل'}
        </Button>
      </View>
      <Text style={{ fontSize: 22, color: colors.primary, fontWeight: 'bold', marginBottom: 16 }}>
        الملف الشخصي
      </Text>
      {user ? (
        <>
          <Avatar.Text
            size={80}
            label={initials}
            style={{ backgroundColor: colors.primary, marginBottom: 12 }}
          />
          <Text style={{ fontSize: 20, color: '#222', marginBottom: 8 }}>{displayName}</Text>
          <Button mode="outlined" onPress={() => setEditVisible(true)} style={{ marginBottom: 16 }}>
            تعديل الاسم
          </Button>
          <Text style={{ fontSize: 18, color: '#222', marginBottom: 8 }}>البريد الإلكتروني:</Text>
          <Text style={{ fontSize: 16, color: '#444', marginBottom: 24 }}>{user.email}</Text>
          <Text style={{ fontSize: 16, color: '#888', marginBottom: 4 }}>معرّف المستخدم: {user.id}</Text>
          <Text style={{ fontSize: 16, color: '#888', marginBottom: 4 }}>تاريخ الإنشاء: {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'غير متوفر'}</Text>
          {user.phone && (
            <Text style={{ fontSize: 16, color: '#888', marginBottom: 4 }}>الهاتف: {user.phone}</Text>
          )}
          <Button mode="outlined" onPress={() => navigation.navigate('MyListings')} style={{ marginBottom: 16 }}>
            منتجاتي وخدماتي
          </Button>
          <Text style={{ fontSize: 18, color: colors.primary, marginTop: 32, marginBottom: 8 }}>أحدث الرسائل</Text>
          {messagesLoading ? (
            <Text style={{ color: '#888' }}>جاري التحميل...</Text>
          ) : messages.length === 0 ? (
            <Text style={{ color: '#888' }}>لا توجد رسائل حديثة</Text>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <MessageItem message={item} userId={user.id} />}
              style={{ width: '90%' }}
            />
          )}
          <Button mode="contained" onPress={logout} style={{ width: 200 }}>
            تسجيل الخروج
          </Button>
          <Portal>
            <Dialog visible={editVisible} onDismiss={() => setEditVisible(false)}>
              <Dialog.Title>تعديل الاسم</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="الاسم الجديد"
                  value={newName}
                  onChangeText={setNewName}
                  autoFocus
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setEditVisible(false)}>إلغاء</Button>
                <Button loading={loading} onPress={handleSave}>حفظ</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </>
      ) : (
        <Text style={{ color: '#888' }}>لم يتم تسجيل الدخول</Text>
      )}
    </View>
  );
} 