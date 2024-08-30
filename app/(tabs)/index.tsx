import { StyleSheet, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useEffect } from 'react';

export default function HomeScreen() {
  const width = useSharedValue(100);
  const opacity = useSharedValue(1);
  const titlePosition = useSharedValue(-50);
  const backgroundColor = useSharedValue('#07073c');

  useEffect(() => {
    //Animacion de deslizamiento del titulo
    titlePosition.value = withTiming(-10, { duration: 500 });
  }, []);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
    
    // Animacion de desvanecimiento del titulo
    opacity.value = withTiming(0, { duration: 500 });

    // Animacion de desvanecimiento del fondo
    backgroundColor.value = withTiming('#303546', { duration: 500 });

    
  };



  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titlePosition.value }],
      opacity: opacity.value,
    };
  });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedBackgroundStyle]}>
      <Animated.Text style={[styles.titleContainer, animatedTitleStyle]}>
        Trabajo Practico 8
      </Animated.Text>
      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={{ color: 'white' }}>Iniciar</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    color: 'white',
    fontSize: 24,
    position: 'absolute',
    top: 400, 
  },
  button: {
    position: 'absolute',
    bottom: 50, 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0b0bbf',
  },
});
