import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Floor } from '../data/mockData';

interface FloorSelectorProps {
  floors: Floor[];
  selectedFloor: Floor;
  onFloorSelect: (floor: Floor) => void;
}

const FloorSelector: React.FC<FloorSelectorProps> = ({ floors, selectedFloor, onFloorSelect }) => {
  const getOccupancyColor = (availableSpots: number, totalSpots: number) => {
    const occupancyRate = (totalSpots - availableSpots) / totalSpots;
    if (occupancyRate < 0.5) return '#10B981'; // Green - low occupancy
    if (occupancyRate < 0.8) return '#F59E0B'; // Yellow - medium occupancy
    return '#EF4444'; // Red - high occupancy
  };

  const getOccupancyText = (availableSpots: number, totalSpots: number) => {
    const occupancyRate = ((totalSpots - availableSpots) / totalSpots * 100).toFixed(0);
    return `${occupancyRate}% Full`;
  };

  const renderFloorButton = (floor: Floor) => {
    const isSelected = selectedFloor.id === floor.id;
    const occupancyColor = getOccupancyColor(floor.availableSpots, floor.totalSpots);

    if (isSelected) {
      return (
        <TouchableOpacity
          key={floor.id}
          onPress={() => onFloorSelect(floor)}
          style={styles.floorButtonContainer}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.selectedFloorButton}
          >
            <View style={styles.floorButtonContent}>
              <View style={styles.floorButtonTop}>
                <Text style={styles.selectedFloorText}>Floor {floor.number}</Text>
                <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.selectedFloorSubtext}>
                {floor.availableSpots} / {floor.totalSpots} Available
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={floor.id}
        onPress={() => onFloorSelect(floor)}
        style={styles.floorButtonContainer}
        activeOpacity={0.7}
      >
        <View style={styles.unselectedFloorButton}>
          <View style={styles.floorButtonContent}>
            <View style={styles.floorButtonTop}>
              <Text style={styles.unselectedFloorText}>Floor {floor.number}</Text>
              <View style={[styles.occupancyDot, { backgroundColor: occupancyColor }]} />
            </View>
            <Text style={styles.unselectedFloorSubtext}>
              {getOccupancyText(floor.availableSpots, floor.totalSpots)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {floors.map(renderFloorButton)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  floorButtonContainer: {
    marginRight: 12,
    minWidth: 120,
  },
  selectedFloorButton: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  unselectedFloorButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  floorButtonContent: {
    minHeight: 50,
    justifyContent: 'space-between',
  },
  floorButtonTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedFloorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  unselectedFloorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  selectedFloorSubtext: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  unselectedFloorSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  occupancyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default FloorSelector;