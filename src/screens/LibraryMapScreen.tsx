import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockLibraryData, filterOptions, getSpotColor, Floor, Spot } from '../data/mockData';
import FloorMap from '../components/FloorMap';
import FilterButton from '../components/FilterButton';
import FloorSelector from '../components/FloorSelector';
import SpotModal from '../components/SpotModal';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH > 768;
const isSmallScreen = SCREEN_WIDTH < 375;

const LibraryMapScreen = ({ navigation }: any) => {
  const [selectedFloor, setSelectedFloor] = useState<Floor>(mockLibraryData.floors[1]); // Floor 2
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
  const [filteredSpots, setFilteredSpots] = useState<Spot[]>(selectedFloor.spots);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(1));
  const [headerAnim] = useState(new Animated.Value(0));
  const [mapEnterAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    applyFilters();
    // Entrance animations
    Animated.stagger(200, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(mapEnterAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedFloor, selectedFilters]);

  const applyFilters = () => {
    if (selectedFilters.includes('all')) {
      setFilteredSpots(selectedFloor.spots);
      return;
    }

    const filtered = selectedFloor.spots.filter((spot) => {
      return selectedFilters.some((filter) => {
        if (filter === 'silent' || filter === 'group' || filter === 'collaborative') {
          return spot.zone === filter;
        }
        return spot.features.includes(filter);
      });
    });

    setFilteredSpots(filtered);
  };

  const handleFilterToggle = (filterId: string) => {
    // Enhanced filter animation with bounce
    Animated.parallel([
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
        Animated.spring(fadeAnim, { 
          toValue: 1, 
          tension: 100,
          friction: 8,
          useNativeDriver: true 
        }),
      ]),
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
        Animated.spring(scaleAnim, { 
          toValue: 1, 
          tension: 100,
          friction: 8,
          useNativeDriver: true 
        }),
      ]),
    ]).start();

    if (filterId === 'all') {
      setSelectedFilters(['all']);
      return;
    }

    setSelectedFilters((prev) => {
      const newFilters = prev.filter(f => f !== 'all');
      if (newFilters.includes(filterId)) {
        const updated = newFilters.filter(f => f !== filterId);
        return updated.length === 0 ? ['all'] : updated;
      } else {
        return [...newFilters, filterId];
      }
    });
  };

  const handleSpotPress = (spot: Spot) => {
    setSelectedSpot(spot);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedSpot(null);
  };

  const getAvailableCount = () => {
    return filteredSpots.filter(spot => spot.status === 'available').length;
  };

  const getTotalCount = () => {
    return filteredSpots.length;
  };

  const headerAnimStyle = {
    opacity: headerAnim,
    transform: [
      {
        translateY: headerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
    ],
  };

  const mapAnimStyle = {
    opacity: mapEnterAnim,
    transform: [
      {
        scale: mapEnterAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? 25 : 0 }]}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      
      {/* Animated Header */}
      <Animated.View style={headerAnimStyle}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#EC4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { 
            marginHorizontal: isSmallScreen ? 10 : 20,
            marginTop: 10,
            borderRadius: isTablet ? 20 : 16,
          }]}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={[styles.headerTitle, { fontSize: isTablet ? 28 : isSmallScreen ? 22 : 24 }]}>
                Libraview
              </Text>
              <View style={styles.headerSubtitle}>
                <Ionicons name="library" size={14} color="#FFFFFF" />
                <Text style={styles.headerSubtitleText}>Smart Library Finder</Text>
              </View>
            </View>
            <View style={styles.headerStats}>
              <Ionicons name="location" size={16} color="#FFFFFF" />
              <Text style={styles.headerStatsText}>
                {getAvailableCount()} / {getTotalCount()}
              </Text>
              <Text style={styles.headerStatsLabel}>Available</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Floor Selector */}
      <FloorSelector
        floors={mockLibraryData.floors}
        selectedFloor={selectedFloor}
        onFloorSelect={setSelectedFloor}
      />

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filterOptions.map((filter) => (
          <FilterButton
            key={filter.id}
            filter={filter}
            isSelected={selectedFilters.includes(filter.id)}
            onPress={() => handleFilterToggle(filter.id)}
          />
        ))}
      </ScrollView>

      {/* Floor Map */}
      <Animated.View style={[styles.mapContainer, { opacity: fadeAnim }]}>
        <FloorMap
          floor={selectedFloor}
          spots={filteredSpots}
          onSpotPress={handleSpotPress}
        />
      </Animated.View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend:</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: getSpotColor('available') }]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: getSpotColor('occupied') }]} />
            <Text style={styles.legendText}>Occupied</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: getSpotColor('onhold') }]} />
            <Text style={styles.legendText}>On Hold</Text>
          </View>
        </View>
      </View>

      {/* Spot Details Modal */}
      <SpotModal
        visible={modalVisible}
        spot={selectedSpot}
        onClose={handleCloseModal}
        onReserve={(spot) => {
          navigation.navigate('Reservation', { spot });
          handleCloseModal();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: isTablet ? 24 : 20,
    paddingVertical: isTablet ? 20 : 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.9,
  },
  headerSubtitleText: {
    color: '#FFFFFF',
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  headerStats: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: isSmallScreen ? 10 : 14,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: isSmallScreen ? 70 : 80,
  },
  headerStatsText: {
    color: '#FFFFFF',
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerStatsLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 2,
  },
  filtersContainer: {
    marginTop: 15,
    marginBottom: 10,
    maxHeight: isTablet ? 60 : 50,
  },
  filtersContent: {
    paddingHorizontal: isSmallScreen ? 15 : 20,
    paddingRight: 40,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: isSmallScreen ? 12 : isTablet ? 24 : 20,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: isTablet ? 20 : 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
  },
  legend: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default LibraryMapScreen;