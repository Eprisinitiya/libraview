import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spot } from '../data/mockData';

const ReservationScreen = ({ route, navigation }: any) => {
  const { spot }: { spot: Spot } = route.params;
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [pulseAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    // Pulse animation for the timer
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    if (isActive) {
      pulse.start();
    } else {
      pulse.stop();
      pulseAnimation.setValue(1);
    }

    return () => pulse.stop();
  }, [isActive]);

  const handleTimeUp = () => {
    setIsActive(false);
    Alert.alert(
      'Reservation Expired',
      'Your 15-minute hold has expired. The spot is now available to others.',
      [
        {
          text: 'Find Another Spot',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const startReservation = () => {
    setIsActive(true);
    Alert.alert(
      'Spot Reserved! 🎉',
      `Desk ${spot.deskNumber} is now held for you. You have 15 minutes to reach the library and scan the QR code.`,
      [{ text: 'Got it!' }]
    );
  };

  const cancelReservation = () => {
    Alert.alert(
      'Cancel Reservation',
      'Are you sure you want to cancel your spot reservation?',
      [
        { text: 'Keep Reservation', style: 'cancel' },
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
    if (timeLeft > 10 * 60) return '#10B981'; // Green
    if (timeLeft > 5 * 60) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  const navigateToQRScanner = () => {
    Alert.alert(
      'Ready to Check In?',
      'Go to the QR Scanner to scan your reserved desk and confirm your check-in.',
      [
        { text: 'Not Yet', style: 'cancel' },
        {
          text: 'Scan QR Code',
          onPress: () => navigation.navigate('QRScanner'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reserve Spot</Text>
        <View style={styles.backButton} />
      </LinearGradient>

      {/* Spot Information */}
      <View style={styles.spotInfo}>
        <View style={styles.spotHeader}>
          <Text style={styles.spotTitle}>Desk {spot.deskNumber}</Text>
          <View style={styles.spotBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={styles.spotBadgeText}>Available</Text>
          </View>
        </View>

        <View style={styles.spotDetails}>
          <View style={styles.spotDetailItem}>
            <Ionicons name="location" size={16} color="#6B7280" />
            <Text style={styles.spotDetailText}>Floor 2, Position {spot.position.x}x{spot.position.y}</Text>
          </View>
          
          <View style={styles.spotDetailItem}>
            <Ionicons name="volume-off" size={16} color="#6B7280" />
            <Text style={styles.spotDetailText}>
              {spot.zone === 'silent' ? 'Silent Zone' : 
               spot.zone === 'group' ? 'Group Study' : 'Collaborative Space'}
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            {spot.features.map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureText}>
                  {feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Timer Section */}
      {isActive ? (
        <View style={styles.timerSection}>
          <Text style={styles.timerLabel}>Time Remaining</Text>
          <Animated.View style={[
            styles.timerContainer,
            { transform: [{ scale: pulseAnimation }] }
          ]}>
            <Text style={[styles.timerText, { color: getTimeColor() }]}>
              {formatTime(timeLeft)}
            </Text>
          </Animated.View>
          <Text style={styles.timerSubtitle}>
            Your spot will be released automatically when time expires
          </Text>
        </View>
      ) : (
        <View style={styles.reservationSection}>
          <Ionicons name="time" size={64} color="#6366F1" />
          <Text style={styles.reservationTitle}>Hold This Spot</Text>
          <Text style={styles.reservationText}>
            Reserve this spot for 15 minutes to give you time to reach the library.
            You'll need to scan the QR code at the desk to confirm your check-in.
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {!isActive ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={startReservation}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Ionicons name="time" size={20} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Hold Spot for 15 min</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={navigateToQRScanner}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#10B981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="qr-code" size={20} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Scan QR to Check In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={cancelReservation}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Cancel Reservation</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>How it works:</Text>
        <View style={styles.instructionItem}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.instructionText}>Hold the spot for 15 minutes</Text>
        </View>
        <View style={styles.instructionItem}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.instructionText}>Walk to the library</Text>
        </View>
        <View style={styles.instructionItem}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.instructionText}>Scan the desk QR code to check in</Text>
        </View>
        <View style={styles.instructionItem}>
          <Text style={styles.stepNumber}>4</Text>
          <Text style={styles.instructionText}>Enjoy your study session!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  spotInfo: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  spotTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
  },
  spotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  spotBadgeText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  spotDetails: {
    space: 12,
  },
  spotDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  spotDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  featureTag: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '500',
  },
  timerSection: {
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  timerLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 16,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  timerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
  },
  reservationSection: {
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  reservationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 12,
  },
  reservationText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  primaryButton: {
    marginBottom: 12,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  secondaryButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  instructions: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    backgroundColor: '#6366F1',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default ReservationScreen;