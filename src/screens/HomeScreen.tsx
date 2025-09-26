import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type HomeStackParamList = {
  HomeRoot: undefined;
  LibraryMapFromHome: undefined;
  QRScannerFromHome: undefined;
  Reservation: undefined;
  Scan: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeRoot'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleFindSpot = () => {
    console.log('Find spot button pressed'); // Add this for debugging
    navigation.navigate('LibraryMapFromHome');
  };

  const favoriteSpots = [
    { id: '2B', floor: 'Second Floor', zone: 'Silent Zone' },
    { id: '3K', floor: 'Third Floor', zone: 'Group Study' },
    { id: '1G', floor: 'Ground Floor', zone: 'Silent Zone' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerGreeting}>Good Afternoon, Sarah</Text>
          <Text style={styles.headerTitle}>Welcome to Libraview</Text>
        </View>

        {/* Occupancy Card */}
        <View style={styles.occupancyCard}>
          <View>
            <Text style={styles.occupancyTitle}>Library Occupancy</Text>
            <Text style={styles.occupancyValue}>70 / 145 Spots Taken</Text>
          </View>
          <Ionicons name="people" size={32} color="#1DB954" />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleFindSpot}>
            <Ionicons name="map-outline" size={28} color="#FFFFFF" />
            <Text style={styles.actionText}>Find a Spot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Scan')}>
            <Ionicons name="qr-code-outline" size={28} color="#FFFFFF" />
            <Text style={styles.actionText}>Scan QR</Text>
          </TouchableOpacity>
        </View>

        {/* Favorite Spots */}
        <View style={styles.favoritesContainer}>
          <Text style={styles.sectionTitle}>Your Favorite Spots</Text>
          {favoriteSpots.map((spot) => (
            <TouchableOpacity key={spot.id} style={styles.favoriteItem}>
              <View style={styles.spotIcon}>
                <Ionicons name="location-outline" size={24} color="#1DB954" />
              </View>
              <View>
                <Text style={styles.favoriteId}>Desk {spot.id}</Text>
                <Text style={styles.favoriteDetails}>{spot.floor} - {spot.zone}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerGreeting: {
    fontSize: 16,
    color: '#A7A7A7',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  occupancyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282828',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
  },
  occupancyTitle: {
    fontSize: 16,
    color: '#A7A7A7',
  },
  occupancyValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  actionButton: {
    backgroundColor: '#282828',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontWeight: '600',
  },
  favoritesContainer: {
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  spotIcon: {
    marginRight: 16,
  },
  favoriteId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  favoriteDetails: {
    fontSize: 14,
    color: '#A7A7A7',
    marginTop: 2,
  },
});

export default HomeScreen;
