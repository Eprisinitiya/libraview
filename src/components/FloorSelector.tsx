import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Floor } from '../data/mockData';

interface FloorSelectorProps {
  floors: Floor[];
  selectedFloor: Floor;
  onFloorSelect: (floor: Floor) => void;
}

const FloorSelector: React.FC<FloorSelectorProps> = ({ floors, selectedFloor, onFloorSelect }) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {floors.map(floor => (
          <TouchableOpacity
            key={floor.id}
            style={[
              styles.floorButton,
              selectedFloor.id === floor.id && styles.selectedFloor,
            ]}
            onPress={() => onFloorSelect(floor)}
          >
            <Text style={[
              styles.floorText,
              selectedFloor.id === floor.id && styles.selectedText,
            ]}>
              {floor.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  floorButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#282828',
    marginRight: 10,
  },
  selectedFloor: {
    backgroundColor: '#1DB954',
  },
  floorText: {
    color: '#A7A7A7',
    fontWeight: '500',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default FloorSelector;