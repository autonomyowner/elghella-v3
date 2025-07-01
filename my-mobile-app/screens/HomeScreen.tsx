import React, { useRef, useState } from 'react';
import { View, ScrollView, RefreshControl, Image, TouchableOpacity, Animated, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, FAB, Portal, Modal, TextInput, Button, RadioButton, useTheme, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function SafeImage({ source, style, alt, icon }: { source: any; style: any; alt?: string; icon?: string }) {
  try {
    return <Image source={source} style={style} />;
  } catch (e) {
    return (
      <View style={[style, { backgroundColor: '#e5e5e5', alignItems: 'center', justifyContent: 'center' }]}> 
        <MaterialCommunityIcons name={icon || 'image-off'} size={40} color="#888" />
        <Text style={{ color: '#888', fontSize: 12 }}>{alt || 'لا توجد صورة'}</Text>
      </View>
    );
  }
}

function PlaceholderImage({ style, alt, icon }: { style: any; alt?: string; icon?: string }) {
  return (
    <View style={[style, { backgroundColor: '#e5e5e5', alignItems: 'center', justifyContent: 'center' }]}> 
      <MaterialCommunityIcons name={icon || 'image-off'} size={40} color="#888" />
      <Text style={{ color: '#888', fontSize: 12 }}>{alt || 'لا توجد صورة'}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('product');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Replace with real data reload
  };

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

  const handleAdd = async () => {
    setLoading(true);
    // TODO: Submit to Supabase
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setModalVisible(false);
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
    }, 1000);
  };

  const scrollToAdd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
      setTimeout(() => setModalVisible(true), 400);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 160, backgroundColor: colors.background }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {/* Hero Section */}
          <View style={{ alignItems: 'center', marginTop: 24, marginBottom: 24 }}>
            <Image source={require('../assets/hero.png')} style={{ width: '100%', height: 160, borderRadius: 24, marginBottom: 12 }} resizeMode="cover" />
            <Image source={require('../assets/logo.png')} style={{ width: 80, height: 80, marginBottom: 8, borderRadius: 20, position: 'absolute', top: 100, left: '50%', marginLeft: -40, borderWidth: 4, borderColor: '#fff' }} />
            <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', marginTop: 48, marginBottom: 4, textShadowColor: '#000', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 }}>ElGhella</Text>
            <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 8, textShadowColor: '#000', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>
              تطبيق الهاتف الذكي الخاص بك للزراعة الذكية
            </Text>
            <Button mode="contained" style={{ marginTop: 8, backgroundColor: colors.primary, borderRadius: 24, paddingHorizontal: 32 }} onPress={scrollToAdd}>
              ابدأ الآن
            </Button>
          </View>
          {/* Our Story Section */}
          <Card style={{ margin: 16, borderRadius: 20, backgroundColor: '#fff', elevation: 4, shadowColor: '#000' }}>
            <Card.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons name="book-open-page-variant" size={28} color={colors.primary} style={{ marginLeft: 8 }} />
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.primary, textAlign: 'center' }}>قصتنا</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
                <Image source={require('../assets/story2.png')} style={{ width: 80, height: 80, borderRadius: 12, marginHorizontal: 4 }} />
                <Image source={require('../assets/story1.png')} style={{ width: 80, height: 80, borderRadius: 12, marginHorizontal: 4 }} />
              </View>
              <Text style={{ color: '#444', marginBottom: 6, textAlign: 'center', fontSize: 15, lineHeight: 22 }}>
                وُلدت فكرتنا من شغفنا العميق بالزراعة والإيمان بأهميتها في بناء مستقبل مستدام. لاحظنا الحاجة إلى حلول مبتكرة ومتكاملة تخدم المزارعين وتدعم محبي الزراعة لتحقيق أفضل النتائج.
              </Text>
              <Text style={{ color: '#444', textAlign: 'center', fontSize: 15, lineHeight: 22 }}>
                بدأنا كشركة ناشئة، الأولى من نوعها، لتقديم خدمات زراعية واستشارات متخصصة تجمع بين الخبرة التقنية والابتكار. نحن هنا لنكون شريكك الموثوق، نقدم الدعم اللازم لتحويل رؤيتك الزراعية إلى واقع، سواء كنت مزارعًا خبيرًا أو مبتدئًا في هذا المجال. في رحلتنا، نطمح لبناء مجتمع زراعي مستدام ومتقدم، ونؤمن بأن المستقبل الأفضل يبدأ بزراعة أفضل.
              </Text>
            </Card.Content>
          </Card>
          {/* About Us Section */}
          <Card style={{ margin: 16, borderRadius: 20, backgroundColor: '#fff', elevation: 4, shadowColor: '#000' }}>
            <Card.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons name="account-group" size={28} color={colors.primary} style={{ marginLeft: 8 }} />
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.primary, textAlign: 'center' }}>عن شركتنا</Text>
              </View>
              <View style={{ alignItems: 'center', marginBottom: 12 }}>
                <Image source={require('../assets/vr.webp')} style={{ width: 180, height: 120, borderRadius: 16 }} />
              </View>
              <Text style={{ color: '#444', marginBottom: 6, textAlign: 'center', fontSize: 15, lineHeight: 22 }}>
                نحن شركة ناشئة متخصصة في الزراعة والخدمات الزراعية والاستشارات، نسعى لتمكين المزارعين والأفراد المهتمين بالزراعة من تحقيق إنتاجية أعلى ونتائج مستدامة.
              </Text>
              <Text style={{ color: '#444', marginBottom: 6, textAlign: 'center', fontSize: 15, lineHeight: 22 }}>
                تأسست شركتنا على أساس رؤية واضحة: تقديم حلول مبتكرة وشاملة تعزز من جودة الإنتاج الزراعي وتدعم مجتمع المزارعين. نحن نؤمن بأن الزراعة ليست مجرد مهنة، بل هي رسالة لبناء مستقبل أكثر خضرة واستدامة.
              </Text>
              <Text style={{ color: '#444', marginBottom: 6, textAlign: 'center', fontSize: 15, lineHeight: 22 }}>
                فريقنا يضم مجموعة من الخبراء في المجال الزراعي، الذين يجمعون بين المعرفة العملية والرؤية المستقبلية لتقديم خدمات واستشارات مصممة خصيصًا لتلبية احتياجاتك.
              </Text>
              <Text style={{ color: '#444', textAlign: 'center', fontSize: 15, lineHeight: 22 }}>
                معنا، الزراعة ليست فقط عملًا، بل أسلوب حياة نطمح إلى تحسينه باستمرار.
              </Text>
            </Card.Content>
          </Card>
          {/* Contact Us Section */}
          <Card style={{ margin: 16, borderRadius: 20, backgroundColor: '#fff', elevation: 4, shadowColor: '#000' }}>
            <Card.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons name="email" size={28} color={colors.primary} style={{ marginLeft: 8 }} />
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.primary, textAlign: 'center' }}>تواصل معنا</Text>
              </View>
              <Text style={{ color: '#444', marginBottom: 6, textAlign: 'center', fontSize: 15 }}>
                يمكنك التواصل معنا عبر البريد الإلكتروني: support@elghella.com
              </Text>
              <Text style={{ color: '#444', textAlign: 'center', fontSize: 15 }}>
                أو عبر الهاتف: 0123456789
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>
        <Portal>
          <FAB
            icon="plus"
            style={{ position: 'absolute', right: 32, bottom: 80, backgroundColor: colors.primary, zIndex: 1000 }}
            onPress={() => setModalVisible(true)}
          />
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={{ backgroundColor: 'white', margin: 24, borderRadius: 12, padding: 24 }}>
            <View>
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
              <Button mode="contained" loading={loading} onPress={handleAdd} disabled={!title || !description}>
                إضافة
              </Button>
            </View>
          </Modal>
        </Portal>
        <Portal>
          <Modal visible={success} onDismiss={() => setSuccess(false)} contentContainerStyle={{ backgroundColor: 'white', margin: 24, borderRadius: 12, padding: 24, alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, color: colors.primary, marginBottom: 8 }}>تمت الإضافة بنجاح!</Text>
              <Button onPress={() => setSuccess(false)}>حسنًا</Button>
            </View>
          </Modal>
        </Portal>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
} 