import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, Portal, Modal, Snackbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const offers = [
  {
    id: '1',
    title: 'خصم 20% على كراء الأراضي',
    description: 'استفد من خصم خاص عند كراء أرض فلاحية هذا الشهر.',
    details: 'هذا العرض متاح لفترة محدودة فقط. سارع بالاستفادة منه عند كراء أي أرض فلاحية عبر التطبيق.',
    icon: 'gift',
  },
  {
    id: '2',
    title: 'عرض خاص على كراء الآلات',
    description: 'كراء آلة واحصل على يوم مجاني إضافي.',
    details: 'عند كراء أي آلة زراعية، ستحصل على يوم إضافي مجانًا بشكل تلقائي.',
    icon: 'tractor',
  },
  {
    id: '3',
    title: 'استشارة مجانية مع خبير',
    description: 'احصل على استشارة مجانية عند إضافة منتج جديد.',
    details: 'أضف منتجًا جديدًا وستحصل على استشارة مجانية من أحد خبرائنا.',
    icon: 'account-tie',
  },
];

type Offer = typeof offers[number];

export default function OffersScreen() {
  const { colors } = useTheme();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleClaim = () => {
    setSnackbarVisible(true);
    setSelectedOffer(null);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, color: colors.primary, fontWeight: 'bold', marginBottom: 16 }}>
        العروض الحالية
      </Text>
      {offers.map((offer) => (
        <Card key={offer.id} style={{ marginBottom: 16 }} onPress={() => setSelectedOffer(offer)}>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name={offer.icon} size={48} color={colors.primary} style={{ marginRight: 16 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{offer.title}</Text>
                <Text style={{ color: '#444', marginBottom: 8 }}>{offer.description}</Text>
                <Button mode="contained" onPress={() => setSelectedOffer(offer)}>عرض التفاصيل</Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
      <Portal>
        <Modal visible={!!selectedOffer} onDismiss={() => setSelectedOffer(null)} contentContainerStyle={{ backgroundColor: 'white', margin: 24, borderRadius: 12, padding: 24 }}>
          {selectedOffer ? (
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name={selectedOffer.icon} size={64} color={colors.primary} style={{ marginBottom: 16 }} />
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.primary, marginBottom: 8 }}>{selectedOffer.title}</Text>
              <Text style={{ fontSize: 16, color: '#444', marginBottom: 12, textAlign: 'center' }}>{selectedOffer.details}</Text>
              <Button mode="contained" onPress={handleClaim}>المطالبة بالعرض</Button>
            </View>
          ) : <View />}
        </Modal>
        <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={2000} style={{ backgroundColor: colors.primary }}>
          تم المطالبة بالعرض بنجاح!
        </Snackbar>
      </Portal>
    </ScrollView>
  );
} 