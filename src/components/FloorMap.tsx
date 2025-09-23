import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Floor, Spot, getSpotColor } from '../data/mockData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH > 768;
const isSmallScreen = SCREEN_WIDTH < 375;

interface FloorMapProps {
  floor: Floor;
  spots: Spot[];
  onSpotPress: (spot: Spot) => void;
}

const FloorMap: React.FC<FloorMapProps> = ({ floor, spots, onSpotPress }) => {
  const mapWidth = SCREEN_WIDTH - (isSmallScreen ? 60 : isTablet ? 100 : 80);
  const mapHeight = isTablet ? 700 : isSmallScreen ? 500 : 600;
  const [spotsAnim] = useState(new Animated.Value(0));
  const [pulseAnimValues] = useState(
    spots.reduce((acc, spot) => {
      acc[spot.id] = new Animated.Value(1);
      return acc;
    }, {} as { [key: string]: Animated.Value })
  );

  useEffect(() => {
    // Animate spots appearing
    Animated.stagger(50, 
      spots.map((_, index) => 
        Animated.timing(spotsAnim, {
          toValue: 1,
          duration: 300,
          delay: index * 20,
          useNativeDriver: true,
        })
      )
    ).start();

    // Pulse animation for available spots
    const pulseAnimations = Object.entries(pulseAnimValues).map(([spotId, animValue]) => {
      const spot = spots.find(s => s.id === spotId);
      if (spot?.status === 'available') {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(animValue, {
              toValue: 1.1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
          ])
        );
      }
      return null;
    }).filter(Boolean);

    pulseAnimations.forEach(anim => anim?.start());

    return () => {
      pulseAnimations.forEach(anim => anim?.stop());
    };
  }, [spots]);

  const renderSpot = (spot: Spot) => {
    const spotSize = isTablet ? 40 : isSmallScreen ? 28 : 32;
    const left = (spot.position.x / 400) * mapWidth - spotSize / 2;
    const top = (spot.position.y / 600) * mapHeight - spotSize / 2;
    const pulseAnim = pulseAnimValues[spot.id] || new Animated.Value(1);

    const spotStyle = {
      opacity: spotsAnim,
      transform: [
        { scale: spot.status === 'available' ? pulseAnim : spotsAnim },
        {
          translateY: spotsAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View key={spot.id} style={[spotStyle, { position: 'absolute', left, top }]}>
        <TouchableOpacity
          style={[
            styles.spot,
            {
              backgroundColor: getSpotColor(spot.status),
              width: spotSize,
              height: spotSize,
              borderRadius: spotSize / 2,
            },
          ]}
          onPress={() => onSpotPress(spot)}
          activeOpacity={0.8}
        >
          <Text style={[styles.spotText, { fontSize: isTablet ? 12 : isSmallScreen ? 8 : 10 }]}>
            {spot.deskNumber}
          </Text>
          {spot.holdTimer && (
            <Animated.View style={[
              styles.timerBadge,
              {
                transform: [{ scale: pulseAnim }],
              }
            ]}>
              <Text style={styles.timerText}>{spot.holdTimer}m</Text>
            </Animated.View>
          )}
          {spot.status === 'available' && (
            <View style={styles.availablePulse} />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderZoneLabels = () => {
    return (
      <>
        {/* Silent Zone Label */}
        <View style={[styles.zoneLabel, { top: 50, left: 20 }]}>
          <Ionicons name="volume-off" size={16} color="#6B7280" />
          <Text style={styles.zoneLabelText}>Silent Zone</Text>
        </View>

        {/* Group Study Label */}
        <View style={[styles.zoneLabel, { top: 280, left: 20 }]}>
          <Ionicons name="people" size={16} color="#6B7280" />
          <Text style={styles.zoneLabelText}>Group Study</Text>
        </View>

        {/* Collaborative Space Label */}
        <View style={[styles.zoneLabel, { top: 380, left: 20 }]}>
          <Ionicons name="chatbubbles" size={16} color="#6B7280" />
          <Text style={styles.zoneLabelText}>Collaborative</Text>
        </View>
      </>
    );
  };

  const renderFloorPlan = () => {
    return (
      <View style={styles.floorPlan}>
        {/* Windows */}
        <View style={[styles.window, { top: 80, left: 0, width: mapWidth, height: 4 }]} />
        <View style={[styles.window, { top: 0, left: 0, width: 4, height: mapHeight }]} />
        <View style={[styles.window, { top: 0, right: 0, width: 4, height: mapHeight }]} />

        {/* Walls and separations */}
        <View style={[styles.wall, { top: 250, left: 40, width: mapWidth - 80, height: 2 }]} />
        <View style={[styles.wall, { top: 360, left: 40, width: mapWidth - 80, height: 2 }]} />

        {/* Entrance */}
        <View style={[styles.entrance, { bottom: 20, left: mapWidth / 2 - 40, width: 80, height: 6 }]}>
          <Text style={styles.entranceText}>Entrance</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { width: mapWidth, height: mapHeight }]}>
      {/* Floor Plan Structure */}
      {renderFloorPlan()}
      
      {/* Zone Labels */}
      {renderZoneLabels()}
      
      {/* Floor Title */}
      <View style={styles.floorTitle}>
        <Text style={styles.floorTitleText}>{floor.name}</Text>
        <Text style={styles.floorSubtitle}>
          {floor.availableSpots}/{floor.totalSpots} spots available
        </Text>
      </View>
      
      {/* Study Spots */}
      {spots.map(renderSpot)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#F9FAFB',
    margin: 0,
    borderRadius: 0,
    overflow: 'hidden',
  },
  floorTitle: {
    position: 'absolute',
    top: 15,
    right: 15,
    alignItems: 'flex-end',
  },
  floorTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  floorSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  floorPlan: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  window: {
    backgroundColor: '#DBEAFE',
    position: 'absolute',
  },
  wall: {
    backgroundColor: '#D1D5DB',
    position: 'absolute',
  },
  entrance: {
    backgroundColor: '#10B981',
    position: 'absolute',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entranceText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  spot: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  availablePulse: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: 'rgba(76, 175, 80, 0.4)',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  spotText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  timerBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  zoneLabel: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  zoneLabelText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default FloorMap;