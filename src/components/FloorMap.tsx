import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Floor, Spot, getSpotColor } from '../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface FloorMapProps {
  floor: Floor;
  spots: Spot[];
  onSpotPress: (spot: Spot) => void;
}

const FloorMap: React.FC<FloorMapProps> = ({ spots, onSpotPress }) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <View style={styles.container}>
        <Animated.View style={animatedStyle}>
          {spots.map(spot => {
            const spotSize = SCREEN_WIDTH / 12;
            const left = (spot.position.x / 400) * (SCREEN_WIDTH * 1.5);
            const top = (spot.position.y / 600) * (SCREEN_WIDTH * 1.5 * 1.2);

            return (
              <TouchableOpacity
                key={spot.id}
                style={[
                  styles.spot,
                  {
                    left,
                    top,
                    width: spotSize,
                    height: spotSize,
                    borderRadius: spotSize / 2,
                    backgroundColor: getSpotColor(spot.status),
                  },
                ]}
                onPress={() => onSpotPress(spot)}
              >
                <Text style={styles.spotText}>{spot.deskNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    overflow: 'hidden',
  },
  spot: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#121212',
  },
  spotText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default FloorMap;
