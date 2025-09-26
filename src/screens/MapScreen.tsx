import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockLibraryData, filterOptions, Floor, Spot } from '../data/mockData';
import FloorMap from '../components/FloorMap';
import FilterButton from '../components/FilterButton';
import FloorSelector from '../components/FloorSelector';
import SpotModal from '../components/SpotModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MapScreen = ({ navigation }: any) => {
  const [selectedFloor, setSelectedFloor] = useState<Floor>(mockLibraryData.floors[1]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
  const [filteredSpots, setFilteredSpots] = useState<Spot[]>(selectedFloor.spots);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [selectedFloor, selectedFilters]);

  const applyFilters = () => {
    if (selectedFilters.includes('all')) {
      setFilteredSpots(selectedFloor.spots);
      return;
    }
    const filtered = selectedFloor.spots.filter(spot =>
      selectedFilters.some(filter => spot.features.includes(filter) || spot.zone === filter)
    );
    setFilteredSpots(filtered);
  };

  const handleFilterToggle = (filterId: string) => {
    if (filterId === 'all') {
      setSelectedFilters(['all']);
    } else {
      setSelectedFilters(prev => {
        const newFilters = prev.filter(f => f !== 'all').filter(f => f !== filterId);
        return prev.includes(filterId) ? newFilters : [...newFilters, filterId];
      });
    }
  };

  const handleSpotPress = (spot: Spot) => {
    setSelectedSpot(spot);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FloorSelector
        floors={mockLibraryData.floors}
        selectedFloor={selectedFloor}
        onFloorSelect={setSelectedFloor}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
      >
        {filterOptions.map(filter => (
          <FilterButton
            key={filter.id}
            filter={filter}
            isSelected={selectedFilters.includes(filter.id)}
            onPress={() => handleFilterToggle(filter.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.mapContainer}>
        <FloorMap
          floor={selectedFloor}
          spots={filteredSpots}
          onSpotPress={handleSpotPress}
        />
      </View>

      <SpotModal
        visible={modalVisible}
        spot={selectedSpot}
        onClose={() => setModalVisible(false)}
        onReserve={spot => {
          setModalVisible(false);
          navigation.navigate('Reservation', { spot });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default MapScreen;
