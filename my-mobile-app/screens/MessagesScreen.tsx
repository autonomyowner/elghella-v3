import React, { useState } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export default function MessagesScreen() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Replace with real data reload
  };
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: colors.primary }}>الرسائل</Text>
      <Text style={{ marginTop: 12, color: '#222' }}>ميزة الدردشة قادمة قريبًا!</Text>
    </ScrollView>
  );
} 