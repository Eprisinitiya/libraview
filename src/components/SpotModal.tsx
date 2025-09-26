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

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Desk {spot.deskNumber}</Text>
            <Text style={styles.status}>
              Status: <Text style={{ color: spot.status === 'available' ? '#1DB954' : '#EF4444' }}>{spot.status}</Text>
            </Text>
            <View style={styles.features}>
              {spot.features.map(feature => (
                <View key={feature} style={styles.featureItem}>
                  <Ionicons name={getFeatureIcon(feature) as any} size={16} color="#1DB954" />
                  <Text style={styles.featureText}>{feature.replace('_', ' ')}</Text>
                </View>
              ))}
            </View>
            {spot.status === 'available' && (
              <TouchableOpacity style={styles.reserveButton} onPress={() => onReserve(spot)}>
                <Text style={styles.reserveButtonText}>Hold Spot for 15 min</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    backgroundColor: '#282828',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalContent: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    color: '#A7A7A7',
    marginBottom: 16,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  reserveButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpotModal;