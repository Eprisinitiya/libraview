import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SpotDetailsScreen = ({ route, navigation }: any) => {
  const { spot } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Desk {spot?.deskNumber || 'Unknown'}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={20} color="#A7A7A7" />
          <Text style={styles.detailText}>Floor: {spot?.floor || 'N/A'}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="layers-outline" size={20} color="#A7A7A7" />
          <Text style={styles.detailText}>Zone: {spot?.zone || 'N/A'}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="flash-outline" size={20} color="#A7A7A7" />
          <Text style={styles.detailText}>Features: {spot?.features.join(', ') || 'None'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#181818',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  content: {
    padding: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
});

export default SpotDetailsScreen;