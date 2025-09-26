import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterOption {
  id: string;
  label: string;
  icon: string;
}

interface FilterButtonProps {
  filter: FilterOption;
  isSelected: boolean;
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filter, isSelected, onPress }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      friction: 5,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    });
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[styles.button, isSelected ? styles.selected : styles.unselected]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Ionicons
          name={filter.icon as any}
          size={16}
          color={isSelected ? '#FFFFFF' : '#A7A7A7'}
        />
        <Text style={[styles.text, isSelected ? styles.selectedText : styles.unselectedText]}>
          {filter.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#1DB954',
  },
  unselected: {
    backgroundColor: '#282828',
  },
  text: {
    fontSize: 14,
    marginLeft: 8,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#A7A7A7',
  },
});

export default FilterButton;