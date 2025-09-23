import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Spot, getFeatureIcon } from '../data/mockData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SpotModalProps {
  visible: boolean;
  spot: Spot | null;
  onClose: () => void;
  onReserve: (spot: Spot) => void;
}

const SpotModal: React.FC<SpotModalProps> = ({ visible, spot, onClose, onReserve }) => {
  if (!spot) return null;

  const getStatusColor = () => {
    switch (spot.status) {
      case 'available':
        return '#10B981';
      case 'occupied':
        return '#EF4444';
      case 'onhold':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = () => {
    switch (spot.status) {
      case 'available':
        return 'Available';
      case 'occupied':
        return 'Occupied';
      case 'onhold':
        return `On Hold (${spot.holdTimer}m remaining)`;
      default:
        return 'Unknown';
    }
  };

  const getZoneIcon = () => {
    switch (spot.zone) {
      case 'silent':
        return 'volume-off';
      case 'group':
        return 'people';
      case 'collaborative':
        return 'chatbubbles';
      default:
        return 'location';
    }
  };

  const getZoneText = () => {
    switch (spot.zone) {
      case 'silent':
        return 'Silent Zone';
      case 'group':
        return 'Group Study Area';
      case 'collaborative':
        return 'Collaborative Space';
      default:
        return 'Study Area';
    }
  };

  const renderFeature = (feature: string) => {
    const iconName = getFeatureIcon(feature);
    const featureText = feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    return (
      <View key={feature} style={styles.featureItem}>
        <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={16} color="#6366F1" />
        <Text style={styles.featureText}>{featureText}</Text>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <BlurView intensity={20} style={styles.backdrop}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <Text style={styles.title}>Desk {spot.deskNumber}</Text>
                  <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                    <Text style={[styles.statusText, { color: getStatusColor() }]}>
                      {getStatusText()}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Zone Information */}
              <View style={styles.zoneContainer}>
                <Ionicons 
                  name={getZoneIcon() as keyof typeof Ionicons.glyphMap} 
                  size={20} 
                  color="#6366F1" 
                />
                <Text style={styles.zoneText}>{getZoneText()}</Text>
              </View>

              {/* Features */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Features</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.featuresScroll}
                >
                  {spot.features.map(renderFeature)}
                </ScrollView>
              </View>

              {/* Additional Information */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Details</Text>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <Ionicons name="location" size={16} color="#6B7280" />
                    <Text style={styles.detailText}>Position: {spot.position.x}, {spot.position.y}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="time" size={16} color="#6B7280" />
                    <Text style={styles.detailText}>
                      {spot.status === 'available' ? 'Available Now' : 
                       spot.status === 'onhold' ? `Reserved until ${spot.holdTimer}m` : 
                       'Currently Occupied'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Action Button */}
              {spot.status === 'available' && (
                <TouchableOpacity
                  onPress={() => onReserve(spot)}
                  activeOpacity={0.8}
                  style={styles.reserveButtonContainer}
                >
                  <LinearGradient
                    colors={['#6366F1', '#8B5CF6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.reserveButton}
                  >
                    <Ionicons name="time" size={20} color="#FFFFFF" />
                    <Text style={styles.reserveButtonText}>Hold Spot for 15 min</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              {spot.status === 'onhold' && (
                <View style={styles.onHoldContainer}>
                  <Ionicons name="time" size={20} color="#F59E0B" />
                  <Text style={styles.onHoldText}>This spot is temporarily reserved</Text>
                </View>
              )}

              {spot.status === 'occupied' && (
                <View style={styles.occupiedContainer}>
                  <Ionicons name="person" size={20} color="#EF4444" />
                  <Text style={styles.occupiedText}>This spot is currently occupied</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
    marginTop: -8,
    marginRight: -8,
  },
  zoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  zoneText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  featuresScroll: {
    flexDirection: 'row',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366F1',
    marginLeft: 6,
  },
  detailsContainer: {
    space: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  reserveButtonContainer: {
    marginTop: 8,
  },
  reserveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  onHoldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    marginTop: 8,
  },
  onHoldText: {
    color: '#D97706',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  occupiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    marginTop: 8,
  },
  occupiedText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default SpotModal;