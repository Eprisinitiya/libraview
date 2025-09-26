import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = ({ navigation }: any) => {
  const userStats = [
    { label: 'Sessions', value: '47', icon: 'time-outline' },
    { label: 'Hours', value: '132', icon: 'hourglass-outline' },
    { label: 'Favorite', value: '2B', icon: 'heart-outline' },
    { label: 'Streak', value: '8d', icon: 'calendar-outline' },
  ];

  const menuItems = [
    { title: 'Booking History', icon: 'receipt-outline', screen: 'BookingHistory' },
    { title: 'Settings', icon: 'settings-outline', screen: 'Settings' },
    { title: 'Help & Support', icon: 'help-buoy-outline', screen: 'Help' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.profileName}>Sarah Johnson</Text>
          <Text style={styles.profileEmail}>sarah.j@university.edu</Text>
        </View>

        <View style={styles.statsGrid}>
          {userStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={28} color="#1DB954" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <Ionicons name={item.icon as any} size={24} color="#A7A7A7" />
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#A7A7A7" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.appVersion}>Libraview v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileEmail: {
    fontSize: 16,
    color: '#A7A7A7',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '23%',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#A7A7A7',
    marginTop: 4,
  },
  menuContainer: {
    marginHorizontal: 20,
    backgroundColor: '#282828',
    borderRadius: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  appVersion: {
    textAlign: 'center',
    color: '#A7A7A7',
    fontSize: 12,
    marginBottom: 20,
  },
});

export default ProfileScreen;
