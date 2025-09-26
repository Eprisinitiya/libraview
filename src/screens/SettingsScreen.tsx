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

const SettingsScreen = ({ navigation }: any) => {
  const settingsOptions = [
    { title: 'Account', icon: 'person-circle-outline' },
    { title: 'Notifications', icon: 'notifications-outline' },
    { title: 'Appearance', icon: 'color-palette-outline' },
    { title: 'Privacy & Security', icon: 'lock-closed-outline' },
    { title: 'Help & Support', icon: 'help-buoy-outline' },
    { title: 'About', icon: 'information-circle-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.backButton} />
      </View>
      <ScrollView>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionRow}>
            <Ionicons name={option.icon as any} size={24} color="#A7A7A7" />
            <Text style={styles.optionText}>{option.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#A7A7A7" />
          </TouchableOpacity>
        ))}
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
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#282828',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 16,
  },
});

export default SettingsScreen;
