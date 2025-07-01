import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Button, useTheme, FAB, Portal, Modal, TextInput, RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const services = [
  {
    id: 'land',
    title: 'كراء الأراضي',
    description: 'استأجر أراضي فلاحية بسهولة وشفافية.',
    details: 'يمكنك تصفح الأراضي المتاحة، التواصل مع المالكين، وإتمام عملية الكراء بكل سهولة عبر التطبيق.',
    icon: 'briefcase',
  },
  {
    id: 'machine',
    title: 'كراء الآلات',
    description: 'احصل على أحدث الآلات الزراعية بأفضل الأسعار.',
    details: 'اختر من بين مجموعة واسعة من الآلات، وقم بالحجز مباشرة من التطبيق.',
    icon: 'tractor',
  },
  {
    id: 'greengrocer',
    title: 'الخضّار',
    description: 'بيع وشراء المنتجات الطازجة مباشرة من المزارعين.',
    details: 'اعرض منتجاتك أو تسوق من منتجات الآخرين بسهولة وأمان.',
    icon: 'cart',
  },
  {
    id: 'expertise',
    title: 'الخبرة والاستشارات',
    description: 'تواصل مع خبراء في المجال الزراعي لتحسين إنتاجك.',
    details: 'احصل على استشارات مخصصة من خبراء معتمدين في مختلف المجالات الزراعية.',
    icon: 'account-tie',
  },
];

type Service = typeof services[number];
type ServicesStackParamList = {
  ServicesList: undefined;
  ServiceDetail: { service: Service };
};

const Stack = createNativeStackNavigator<ServicesStackParamList>();

function ServicesListScreen({ navigation }: NativeStackScreenProps<ServicesStackParamList, 'ServicesList'>) {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, color: colors.primary, fontWeight: 'bold', marginBottom: 16 }}>
        خدماتنا
      </Text>
      {services.map((service) => (
        <Card key={service.id} style={{ marginBottom: 16 }} onPress={() => navigation.navigate('ServiceDetail', { service })}>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name={service.icon} size={48} color={colors.primary} style={{ marginRight: 16 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{service.title}</Text>
                <Text style={{ color: '#444', marginBottom: 8 }}>{service.description}</Text>
                <Button mode="contained" onPress={() => navigation.navigate('ServiceDetail', { service })}>عرض</Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

function ServiceDetailScreen({ route }: NativeStackScreenProps<ServicesStackParamList, 'ServiceDetail'>) {
  const { service } = route.params;
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <MaterialCommunityIcons name={service.icon} size={72} color={colors.primary} style={{ marginBottom: 16 }} />
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 8 }}>{service.title}</Text>
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 16 }}>{service.description}</Text>
        <Text style={{ fontSize: 16, color: '#666', marginBottom: 32, textAlign: 'center' }}>{service.details}</Text>
        <Button mode="contained" onPress={() => alert('قريبًا: طلب الخدمة!')}>طلب الخدمة</Button>
      </View>
    </ScrollView>
  );
}

export default function ServicesScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [type, setType] = React.useState('service');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const { colors } = useTheme();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="ServicesList" component={ServicesListScreen} options={{ title: 'الخدمات' }} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={({ route }) => ({ title: route.params.service.title })} />
      </Stack.Navigator>
      <Portal>
        <FAB
          icon="plus"
          style={{ position: 'absolute', right: 24, bottom: 32, backgroundColor: colors.primary, zIndex: 1000 }}
          onPress={() => setModalVisible(true)}
        />
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={{ backgroundColor: 'white', margin: 24, borderRadius: 12, padding: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: colors.primary }}>إضافة منتج أو خدمة</Text>
          <RadioButton.Group onValueChange={setType} value={type}>
            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
              <RadioButton value="product" />
              <Text style={{ marginTop: 8, marginRight: 4 }}>منتج</Text>
              <View style={{ width: 24 }} />
              <RadioButton value="service" />
              <Text style={{ marginTop: 8, marginRight: 4 }}>خدمة</Text>
            </View>
          </RadioButton.Group>
          <TextInput label="العنوان" value={title} onChangeText={setTitle} style={{ marginBottom: 12 }} />
          <TextInput label="الوصف" value={description} onChangeText={setDescription} multiline style={{ marginBottom: 12 }} />
          <TextInput label="السعر (اختياري)" value={price} onChangeText={setPrice} keyboardType="numeric" style={{ marginBottom: 16 }} />
          <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', marginBottom: 16 }}>
            {image ? (
              <Image source={{ uri: image }} style={{ width: 120, height: 90, borderRadius: 8, marginBottom: 8 }} />
            ) : (
              <View style={{ width: 120, height: 90, borderRadius: 8, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Text style={{ color: '#888' }}>إضافة صورة</Text>
              </View>
            )}
            <Text style={{ color: colors.primary, textDecorationLine: 'underline' }}>اختيار صورة</Text>
          </TouchableOpacity>
          <Button mode="contained" loading={loading} onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setSuccess(true);
              setModalVisible(false);
              setTitle('');
              setDescription('');
              setPrice('');
              setImage(null);
            }, 1000);
          }} disabled={!title || !description}>
            إضافة
          </Button>
        </Modal>
      </Portal>
      <Portal>
        <Modal visible={success} onDismiss={() => setSuccess(false)} contentContainerStyle={{ backgroundColor: 'white', margin: 24, borderRadius: 12, padding: 24, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: colors.primary, marginBottom: 8 }}>تمت الإضافة بنجاح!</Text>
          <Button onPress={() => setSuccess(false)}>حسنًا</Button>
        </Modal>
      </Portal>
    </>
  );
} 