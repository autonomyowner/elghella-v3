import React, { useState, useContext, createContext } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme, Card, IconButton, Portal, Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ListingsContext = createContext<{
  listings: Listing[];
  addListing: (listing: Omit<Listing, 'id'>) => void;
  deleteListing: (id: string) => void;
} | null>(null);

const mockInitialListings = [
  {
    id: '1',
    type: 'product',
    title: 'جرار زراعي للبيع',
    description: 'جرار بحالة ممتازة، موديل 2020، استعمال خفيف.',
    price: '150000 دج',
    image: null,
  },
  {
    id: '2',
    type: 'service',
    title: 'كراء أرض فلاحية',
    description: 'أرض خصبة بمساحة 2 هكتار متاحة للكراء في ولاية البليدة.',
    price: '50000 دج/شهر',
    image: null,
  },
];

type Listing = typeof mockInitialListings[number];

export function ListingsProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(mockInitialListings);
  const addListing = (listing: Omit<Listing, 'id'>) => {
    setListings((prev) => [
      { ...listing, id: (Math.random() * 100000).toFixed(0) },
      ...prev,
    ]);
  };
  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <ListingsContext.Provider value={{ listings, addListing, deleteListing }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  return useContext(ListingsContext) as {
    listings: Listing[];
    addListing: (listing: Omit<Listing, 'id'>) => void;
    deleteListing: (id: string) => void;
  };
}

export default function MyListingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { listings, deleteListing } = useListings();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [detailsItem, setDetailsItem] = useState<Listing | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 22, color: colors.primary, fontWeight: 'bold', marginBottom: 16 }}>
          منتجاتي وخدماتي
        </Text>
        {listings.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 48 }}>
            <Text style={{ color: '#888', fontSize: 18, marginBottom: 12 }}>لا توجد منتجات أو خدمات مضافة بعد.</Text>
            <Button mode="contained" onPress={() => navigation.goBack()}>إضافة أول منتج أو خدمة</Button>
          </View>
        ) : (
          listings.map((item: Listing) => (
            <TouchableOpacity key={item.id} onPress={() => setDetailsItem(item)}>
              <Card style={{ marginBottom: 16 }}>
                <Card.Title
                  title={item.title}
                  subtitle={item.type === 'product' ? 'منتج' : 'خدمة'}
                  right={() => (
                    <View style={{ flexDirection: 'row' }}>
                      <IconButton icon="pencil" onPress={() => alert('تعديل قادم قريبًا!')} />
                      <IconButton icon="delete" onPress={() => setDeleteId(item.id)} />
                    </View>
                  )}
                />
                <Card.Content>
                  <Text style={{ color: '#444', marginBottom: 8 }}>{item.description}</Text>
                  <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{item.price}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <Portal>
        <Modal visible={!!deleteId} onDismiss={() => setDeleteId(null)} contentContainerStyle={{ backgroundColor: 'white', margin: 24, borderRadius: 12, padding: 24, alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: colors.primary, marginBottom: 16 }}>هل أنت متأكد من حذف هذا العنصر؟</Text>
            <Button mode="contained" onPress={() => deleteId && deleteListing(deleteId)} style={{ marginBottom: 8 }}>حذف</Button>
            <Button onPress={() => setDeleteId(null)}>إلغاء</Button>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal visible={!!detailsItem} onDismiss={() => setDetailsItem(null)} contentContainerStyle={{ backgroundColor: 'white', margin: 24, borderRadius: 12, padding: 24 }}>
          {detailsItem ? (
            <View>
              <Text style={{ fontSize: 22, color: colors.primary, fontWeight: 'bold', marginBottom: 8 }}>{detailsItem.title}</Text>
              <Text style={{ color: '#444', marginBottom: 8 }}>{detailsItem.description}</Text>
              <Text style={{ color: colors.primary, fontWeight: 'bold', marginBottom: 16 }}>{detailsItem.price}</Text>
              <Button mode="contained" onPress={() => alert('ميزة التواصل قادمة قريبًا!')}>تواصل</Button>
            </View>
          ) : <View />}
        </Modal>
      </Portal>
      <Button mode="outlined" onPress={() => navigation.goBack()} style={{ margin: 16 }}>رجوع</Button>
    </View>
  );
} 