import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
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
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function WelcomeBack() {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  // Valor animado para a transição de saída da tela
  const exitProgress = useSharedValue(0);

  const firstName = user?.displayName ? user.displayName.split(' ')[0] : 'Viajante';

  const navigateToHome = () => {
    navigation.replace('Home');
  };

  useEffect(() => {
    // Inicia a transição de saída após 2.5 segundos
    const timer = setTimeout(() => {
      exitProgress.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) }, (finished) => {
        if (finished) {
          runOnJS(navigateToHome)();
        }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Estilo que faz a tela inteira esmaecer e subir
  const exitAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - exitProgress.value,
      transform: [{ translateY: -50 * exitProgress.value }],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Animated.View style={[styles.mainWrapper, exitAnimatedStyle]}>
        
        {/* Imagem de Topo do Mapa */}
        <Animated.View entering={FadeIn.duration(1000)} style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/images/welcome-back-map.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Textos de Boas-Vindas */}
        <Animated.View entering={FadeInDown.duration(800).delay(300)} style={styles.textContainer}>
          <Text style={styles.title}>Bem-vindo de volta, {firstName}!</Text>
          <Text style={styles.subtitle}>
            Preparando suas próximas aventuras...
          </Text>
        </Animated.View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7', // Mantém o fundo premium
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  illustration: {
    width: '80%',
    height: '80%',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A3328', // Verde escuro da paleta
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#7A8A80', 
    textAlign: 'center',
  },
});
