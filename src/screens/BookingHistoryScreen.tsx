import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bookingHistory } from '../data/mockData';

const BookingHistoryScreen = ({ navigation }: any) => {
  const renderBookingItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle-outline" size={24} color="#1DB954" />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>Desk {item.deskNumber} - Floor {item.floor}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
        <Text style={styles.itemDuration}>Duration: {item.duration}</Text>
      </View>
      <Text style={styles.itemStatus}>{item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking History</Text>
        <View style={styles.backButton} />
      </View>
      <FlatList
        data={bookingHistory}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No booking history found.</Text>}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#181818',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backButton: {
    width: 24,
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  itemDate: {
    fontSize: 14,
    color: '#A7A7A7',
    marginTop: 4,
  },
  itemDuration: {
    fontSize: 14,
    color: '#A7A7A7',
    marginTop: 4,
  },
  itemStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1DB954',
  },
  emptyText: {
    textAlign: 'center',
    color: '#A7A7A7',
    marginTop: 50,
    fontSize: 16,
  },
});

export default BookingHistoryScreen;
