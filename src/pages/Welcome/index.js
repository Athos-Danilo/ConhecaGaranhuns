import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  StatusBar,
  Image 
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  FadeInDown, 
  FadeIn,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Componente para a seção de ícones
const FeatureItem = ({ icon, title, subtitle, delay }) => (
  <Animated.View entering={FadeInDown.duration(800).delay(delay)} style={styles.featureItem}>
    <View style={styles.iconBox}>
      <Feather name={icon} size={24} color="#4A5C50" />
    </View>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureSubtitle}>{subtitle}</Text>
  </Animated.View>
);

export default function Welcome() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  // Valor para animação de saída da tela
  const exitProgress = useSharedValue(0);

  const firstName = user?.displayName ? user.displayName.split(' ')[0] : 'Viajante';

  useEffect(() => {
    const checkWelcome = async () => {
      try {
        const hasSeen = await AsyncStorage.getItem('@hasSeenWelcome');
        // --- MODO DE TESTE ATIVADO ---
        // if (hasSeen === 'true') {
        //   navigation.replace('Home');
        // } else {
          setIsChecking(false);
        // }
      } catch (error) {
        setIsChecking(false);
      }
    };
    
    checkWelcome();
  }, []);

  const navigateToHome = () => {
    navigation.replace('Home');
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('@hasSeenWelcome', 'true');
    } catch (e) {
      console.error(e);
    }
    
    // Dispara animação de saída
    exitProgress.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }, (finished) => {
      if (finished) {
        runOnJS(navigateToHome)();
      }
    });
  };

  // Estilo animado para aplicar o Fade Out e Slide Up na tela inteira
  const exitAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - exitProgress.value,
      transform: [{ translateY: -50 * exitProgress.value }],
    };
  });

  if (isChecking) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Animated.View style={[styles.mainWrapper, exitAnimatedStyle]}>
        
        {/* Imagem de Topo Gerada por IA */}
        <Animated.View entering={FadeIn.duration(1000)} style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/images/Gemini_cleanGenerated_Image_5ty1l75ty1l75ty1.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Textos Principais */}
        <Animated.View entering={FadeInDown.duration(800).delay(200)} style={styles.header}>
          <Text style={styles.title}>Conta criada{"\n"}com sucesso!</Text>
          
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerDot} />
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.subtitle}>
            Sua voz agora é fundamental para valorizar o turismo e destacar os melhores encantos de Garanhuns.
          </Text>
        </Animated.View>

        {/* 3 Funcionalidades */}
        <View style={styles.featuresRow}>
          <FeatureItem 
            icon="map-pin" 
            title="Explore" 
            subtitle={"Descubra lugares\nincríveis"} 
            delay={400} 
          />
          <View style={styles.verticalSeparator} />
          <FeatureItem 
            icon="heart" 
            title="Compartilhe" 
            subtitle={"Suas experiências\ninspiram"} 
            delay={500} 
          />
          <View style={styles.verticalSeparator} />
          <FeatureItem 
            icon="message-square" 
            title="Avalie" 
            subtitle={"Sua opinião\nfaz a diferença"} 
            delay={600} 
          />
        </View>

        <View style={styles.spacer} />

        {/* Botão de Rodapé */}
        <Animated.View entering={FadeInDown.duration(800).delay(800)} style={styles.footer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleContinue}>
            <Text style={styles.buttonText}>Começar a explorar</Text>
            <Feather name="arrow-right" size={20} color="#ffffff" style={styles.buttonIcon} />
          </TouchableOpacity>
        </Animated.View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7', // Off-white da referência
  },
  mainWrapper: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: width * 0.9,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20, // Empurra um pouco para baixo
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A3328', // Verde escuro elegante
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    width: 30,
    height: 1,
    backgroundColor: '#D1D6D3',
  },
  dividerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9DA8A1',
    marginHorizontal: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7A8A80', 
    textAlign: 'left',
    lineHeight: 24,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 40,
  },
  verticalSeparator: {
    width: 1,
    backgroundColor: '#EBEAE5',
    marginTop: 30,
    marginBottom: 20,
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#F4F2EA', // Fundo sutil para o ícone
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A3328',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#9DA8A1',
    textAlign: 'center',
    lineHeight: 16,
  },
  spacer: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4A6153', // Verde militar escuro do botão
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 16,
    shadowColor: '#4A6153',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff', 
    flex: 1,
    textAlign: 'center',
    marginLeft: 20, // Compensa o ícone para ficar centralizado visualmente
  },
  buttonIcon: {
    // A seta
  },
});
