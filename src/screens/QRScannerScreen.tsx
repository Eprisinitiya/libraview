import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH > 768;
const isSmallScreen = SCREEN_WIDTH < 375;

const QRScannerScreen = ({ navigation }: any) => {
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const scanAnimation = React.useRef(new Animated.Value(0)).current;
  const [cornerAnimation] = useState(new Animated.Value(0));
  const [glowAnimation] = useState(new Animated.Value(0));
  const [headerAnimation] = useState(new Animated.Value(0));
  const [instructionsAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Staggered entrance animations
    Animated.stagger(300, [
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(cornerAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(instructionsAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous animations
    const scanLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    );

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    scanLoop.start();
    glowLoop.start();

    return () => {
      scanLoop.stop();
      glowLoop.stop();
    };
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    
    // Mock QR code processing
    if (data.startsWith('LIBRAVIEW_DESK_')) {
      const deskId = data.replace('LIBRAVIEW_DESK_', '');
      
      Alert.alert(
        'Scan Successful! 🎉',
        `You have successfully checked into Desk ${deskId}. Enjoy your study session!`,
        [
          {
            text: 'Continue Studying',
            onPress: () => {
              setScanned(false);
              navigation.navigate('LibraryHome');
            },
          },
        ]
      );
    } else if (data.startsWith('LIBRAVIEW_CHECKOUT_')) {
      const deskId = data.replace('LIBRAVIEW_CHECKOUT_', '');
      
      Alert.alert(
        'Check-out Complete! 👋',
        `You have successfully checked out from Desk ${deskId}. Thank you for using Libraview!`,
        [
          {
            text: 'Done',
            onPress: () => {
              setScanned(false);
              navigation.navigate('LibraryHome');
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Invalid QR Code',
        'This QR code is not recognized by Libraview. Please scan a valid desk QR code.',
        [{ text: 'Try Again', onPress: () => setScanned(false) }]
      );
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  const generateMockQR = () => {
    // For demo purposes, simulate scanning a QR code
    const mockDeskId = Math.random() > 0.5 ? '2B' : '1A';
    const mockData = `LIBRAVIEW_DESK_${mockDeskId}`;
    handleBarCodeScanned({ type: 'qr', data: mockData });
  };

  const scanLineStyle = {
    opacity: scanAnimation,
    transform: [
      {
        translateY: scanAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, isTablet ? 250 : 200],
        }),
      },
    ],
  };

  const cornerStyle = {
    opacity: cornerAnimation,
    transform: [
      {
        scale: cornerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  const headerStyle = {
    opacity: headerAnimation,
    transform: [
      {
        translateY: headerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-30, 0],
        }),
      },
    ],
  };

  const instructionsStyle = {
    opacity: instructionsAnimation,
    transform: [
      {
        translateY: instructionsAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const glowStyle = {
    opacity: glowAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.8],
    }),
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? 10 : 0 }]}>
      <Animated.View style={[styles.header, headerStyle]}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#EC4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.headerGradient, {
            marginHorizontal: isSmallScreen ? 15 : 20,
            borderRadius: isTablet ? 20 : 16,
          }]}
        >
          <Text style={[styles.headerTitle, { fontSize: isTablet ? 28 : isSmallScreen ? 20 : 24 }]}>
            🔍 QR Scanner
          </Text>
          <Text style={[styles.headerSubtitle, { fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16 }]}>
            Point your camera at the desk QR code to check in or out
          </Text>
        </LinearGradient>
      </Animated.View>

      <View style={styles.scannerContainer}>
        <View style={styles.demoScanner}>
          <Animated.View style={[styles.glowEffect, glowStyle]} />
          <Text style={[styles.demoText, { fontSize: isTablet ? 28 : isSmallScreen ? 20 : 24 }]}>
            📱 Demo QR Scanner
          </Text>
          <Text style={[styles.demoSubtext, { fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16 }]}>
            In a real app, camera would appear here
          </Text>
          
          {/* Floating particles effect */}
          <View style={styles.particlesContainer}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.particle,
                  {
                    left: `${15 + i * 15}%`,
                    transform: [{
                      translateY: glowAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -20 - i * 5],
                      })
                    }]
                  }
                ]}
              />
            ))}
          </View>
        </View>
        
        {/* Enhanced Scan Overlay */}
        <View style={styles.overlay}>
          <Animated.View style={[styles.scanFrame, cornerStyle]}>
            <Animated.View style={[styles.corner, styles.topLeft, glowStyle]} />
            <Animated.View style={[styles.corner, styles.topRight, glowStyle]} />
            <Animated.View style={[styles.corner, styles.bottomLeft, glowStyle]} />
            <Animated.View style={[styles.corner, styles.bottomRight, glowStyle]} />
            
            {/* Animated scan line with glow */}
            <Animated.View style={[styles.scanLine, scanLineStyle]} />
            <Animated.View style={[styles.scanLineGlow, scanLineStyle]} />
            
            {/* Center dot */}
            <Animated.View style={[styles.centerDot, {
              transform: [{ scale: glowAnimation }]
            }]} />
          </Animated.View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.controlButton, flashOn && styles.controlButtonActive]}
            onPress={toggleFlash}
          >
            <Ionicons 
              name={flashOn ? "flash" : "flash-off"} 
              size={24} 
              color={flashOn ? "#6366F1" : "#FFFFFF"} 
            />
            <Text style={[styles.controlText, flashOn && styles.controlTextActive]}>
              Flash
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={generateMockQR}>
            <Ionicons name="qr-code" size={24} color="#FFFFFF" />
            <Text style={styles.controlText}>Demo Scan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Enhanced Instructions */}
      <Animated.View style={[styles.instructions, instructionsStyle]}>
        {[
          { icon: 'scan', color: '#6366F1', text: 'Align the QR code within the frame' },
          { icon: 'checkmark-circle', color: '#10B981', text: 'Camera will scan automatically' },
          { icon: 'time', color: '#F59E0B', text: 'Check-in starts your study session' },
        ].map((item, index) => (
          <Animated.View 
            key={index} 
            style={[styles.instructionItem, {
              transform: [{
                translateX: instructionsAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [index % 2 === 0 ? -50 : 50, 0],
                })
              }]
            }]}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
              <Ionicons name={item.icon as any} size={isTablet ? 24 : 20} color={item.color} />
            </View>
            <Text style={[styles.instructionText, { fontSize: isTablet ? 16 : isSmallScreen ? 13 : 14 }]}>
              {item.text}
            </Text>
          </Animated.View>
        ))}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    paddingHorizontal: isSmallScreen ? 15 : 20,
    paddingBottom: isTablet ? 25 : 20,
    paddingTop: 10,
  },
  headerGradient: {
    padding: isTablet ? 24 : isSmallScreen ? 18 : 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  scannerContainer: {
    flex: 1,
    position: 'relative',
  },
  scanner: {
    flex: 1,
  },
  demoScanner: {
    flex: 1,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  glowEffect: {
    position: 'absolute',
    width: '80%',
    height: '60%',
    backgroundColor: '#6366F1',
    borderRadius: 200,
    blur: 50,
  },
  particlesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
    bottom: '20%',
  },
  demoText: {
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(99, 102, 241, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  demoSubtext: {
    color: '#D1D5DB',
    textAlign: 'center',
    fontWeight: '500',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: isTablet ? 300 : isSmallScreen ? 220 : 250,
    height: isTablet ? 300 : isSmallScreen ? 220 : 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: isTablet ? 25 : 20,
    height: isTablet ? 25 : 20,
    borderColor: '#6366F1',
    borderWidth: isTablet ? 4 : 3,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  scanLineGlow: {
    position: 'absolute',
    left: -5,
    right: -5,
    height: 1,
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    blur: 4,
  },
  centerDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EC4899',
    top: '50%',
    left: '50%',
    marginTop: -4,
    marginLeft: -4,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  controls: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 80,
  },
  controlButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  controlText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  controlTextActive: {
    color: '#6366F1',
  },
  instructions: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: isSmallScreen ? 15 : 20,
    marginVertical: 20,
    paddingHorizontal: isTablet ? 24 : 20,
    paddingVertical: isTablet ? 24 : 20,
    borderRadius: isTablet ? 20 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isTablet ? 16 : 14,
    padding: isTablet ? 12 : 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  iconContainer: {
    width: isTablet ? 44 : 36,
    height: isTablet ? 44 : 36,
    borderRadius: isTablet ? 22 : 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isTablet ? 16 : 12,
  },
  instructionText: {
    color: '#374151',
    fontWeight: '600',
    flex: 1,
    lineHeight: isTablet ? 22 : 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
  permissionSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QRScannerScreen;