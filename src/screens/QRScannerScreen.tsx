import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QRScannerScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: 'white', marginBottom: 20 }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
     const action = data.startsWith('LIBRAVIEW_DESK_') ? 'Checked In' : 'Checked Out';
    const deskId = data.split('_').pop();
    Alert.alert(
      `Scan Successful!`,
      `You have successfully ${action.toLowerCase()} at Desk ${deskId}.`,
      [{ text: 'OK', onPress: () => {
        setScanned(false);
        navigation.navigate('Library');
      }}]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Scan QR Code</Text>
      <Text style={styles.subtitle}>Align the QR code to check in or out</Text>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.overlay}>
            <View style={styles.frame} />
        </View>
      </View>
       <TouchableOpacity style={styles.button} onPress={() => handleBarCodeScanned({data: 'LIBRAVIEW_DESK_3A'})}>
        <Ionicons name="qr-code" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Simulate Scan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A7A7A7',
    marginBottom: 40,
  },
  cameraContainer: {
    width: 250,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
  },
  frame: {
      width: '100%',
      height: '100%',
      borderWidth: 4,
      borderColor: '#1DB954',
      borderRadius: 16,
  },
   button: {
    flexDirection: 'row',
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
