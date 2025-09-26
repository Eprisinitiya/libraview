import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spot } from '../data/mockData';

const ReservationScreen = ({ route, navigation }: any) => {
  const { spot }: { spot: Spot } = route.params;
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isActive, setIsActive] = useState(false);
  const [pulseAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(time => time - 1), 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimeUp = () => {
    setIsActive(false);
    Alert.alert(
      'Reservation Expired',
      'This spot is now available to others.',
      [{ text: 'Find Another Spot', onPress: () => navigation.goBack() }]
    );
  };

  const startReservation = () => {
    setIsActive(true);
    Alert.alert(
      'Spot Reserved!',
      `Desk ${spot.deskNumber} is held for you for 15 minutes.`,
      [{ text: 'Got it!' }]
    );
  };

  const cancelReservation = () => {
    Alert.alert(
      'Cancel Reservation',
      'Are you sure you want to cancel?',
      [
        { text: 'Keep It', style: 'cancel' },
        {
          text: 'Cancel',
          style: 'destructive',
          onPress: () => {
            setIsActive(false);
            setTimeLeft(15 * 60);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft > 5 * 60) return '#1DB954';
    if (timeLeft > 2 * 60) return '#F59E0B';
    return '#EF4444';
  };

  const navigateToQRScanner = () => navigation.navigate('QRScanner');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reserve Spot</Text>
        <View style={styles.backButton} />
      </View>

      {/* Spot Details */}
      <View style={styles.card}>
        <Text style={styles.deskNumber}>Desk {spot.deskNumber}</Text>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#A7A7A7" />
          <Text style={styles.detailText}>Floor 2, Position {spot.position.x}x{spot.position.y}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="flash-outline" size={16} color="#A7A7A7" />
          <Text style={styles.detailText}>
            {spot.features.join(', ').replace(/_/g, ' ')}
          </Text>
        </View>
      </View>

      {/* Timer or Reservation Info */}
      {isActive ? (
        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Time Remaining</Text>
          <Text style={[styles.timer, { color: getTimeColor() }]}>
            {formatTime(timeLeft)}
          </Text>
        </View>
      ) : (
        <View style={styles.holdInfo}>
          <Ionicons name="time-outline" size={64} color="#1DB954" />
          <Text style={styles.holdTitle}>Hold this Spot</Text>
          <Text style={styles.holdSubtitle}>
            Reserve this spot for 15 minutes. Scan the QR code at the desk to check in.
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.footer}>
        {!isActive ? (
          <TouchableOpacity style={styles.primaryButton} onPress={startReservation}>
            <Text style={styles.buttonText}>Hold for 15 Minutes</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.primaryButton} onPress={navigateToQRScanner}>
              <Text style={styles.buttonText}>Scan QR to Check In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={cancelReservation}>
              <Text style={styles.secondaryButtonText}>Cancel Reservation</Text>
            </TouchableOpacity>
          </>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 20,
    margin: 20,
  },
  deskNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#A7A7A7',
    marginLeft: 8,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 18,
    color: '#A7A7A7',
    marginBottom: 10,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  holdInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  holdTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  holdSubtitle: {
    fontSize: 16,
    color: '#A7A7A7',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    padding: 20,
  },
  primaryButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 12,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#A7A7A7',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservationScreen;