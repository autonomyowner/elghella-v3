import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Card, Button, useTheme } from 'react-native-paper';

const mockListings = [
  {
    id: '1',
    title: 'جرار زراعي للبيع',
    description: 'جرار بحالة ممتازة، موديل 2020، استعمال خفيف.',
    price: '150000 دج',
    image: null,
  },
  {
    id: '2',
    title: 'كراء أرض فلاحية',
    description: 'أرض خصبة بمساحة 2 هكتار متاحة للكراء في ولاية البليدة.',
    price: '50000 دج/شهر',
    image: null,
  },
  {
    id: '3',
    title: 'منتجات طازجة',
    description: 'خضروات وفواكه طازجة من المزرعة مباشرة.',
    price: 'حسب الطلب',
    image: null,
  },
];

export default function MarketplaceScreen() {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={{ padding: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      {mockListings.map((item) => (
        <Card key={item.id} style={{ width: 180, margin: 8, borderRadius: 16, backgroundColor: '#fff', elevation: 2 }}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 100, borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
          ) : (
            <View style={{ width: '100%', height: 100, backgroundColor: '#e5e5e5', borderTopLeftRadius: 16, borderTopRightRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#888' }}>لا توجد صورة</Text>
            </View>
          )}
          <Card.Content>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.primary, marginBottom: 4 }}>{item.title}</Text>
            <Text style={{ color: '#444', marginBottom: 8 }}>{item.description}</Text>
            <Text style={{ color: colors.primary, fontWeight: 'bold', marginBottom: 8 }}>{item.price}</Text>
            <Button mode="contained" onPress={() => alert('تفاصيل قادمة قريبًا!')}>عرض التفاصيل</Button>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
} 