# 📚 Libraview - Smart Library Finder

A modern, interactive mobile app that helps students find and reserve study spots in real-time using QR code technology.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 🎯 **Features**

### ✨ **Core Functionality**
- **📱 Real-time Library Map**: Interactive floor plans with live spot availability
- **🔍 Smart Filtering**: Filter by Silent Zone, Power Outlets, Window Seats, Group Study areas
- **⏰ 15-minute Hold System**: Reserve spots with countdown timer
- **📱 QR Code Scanner**: Check-in/check-out system for study desks
- **👤 User Profile**: Study statistics and activity tracking

### 🎨 **Modern UI/UX**
- **📱 Responsive Design**: Optimized for tablets, phones, and small screens
- **🌈 Dynamic Animations**: Smooth entrance animations, bounce effects, and micro-interactions
- **⚡ Real-time Updates**: Live spot status changes
- **🎭 Beautiful Gradients**: Modern color schemes with shadow effects

## 🏗️ **Architecture**

### **📁 Project Structure**
```
src/
├── components/          # Reusable UI components
│   ├── FloorMap.tsx    # Interactive map component
│   ├── FilterButton.tsx # Animated filter buttons
│   ├── FloorSelector.tsx # Floor navigation
│   └── SpotModal.tsx   # Spot details modal
├── data/               # Mock data and types
│   └── mockData.ts     # Library floors and spots data
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx # Bottom tabs + stack navigation
└── screens/            # Main app screens
    ├── LibraryMapScreen.tsx  # Main map interface
    ├── QRScannerScreen.tsx   # QR code scanner
    ├── ReservationScreen.tsx # Spot reservation flow
    └── ProfileScreen.tsx     # User profile & stats
```

### **🔧 Tech Stack**
- **Frontend**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **Animations**: React Native Animated API
- **UI Components**: Custom components with Expo Vector Icons
- **Styling**: StyleSheet with responsive design

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your phone (for testing)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Eprisinitiya/libraview.git
   cd libraview
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Test on your device**
   - Scan the QR code with Expo Go app
   - Or press `w` for web version

## 📱 **How to Use**

### **📍 Finding a Study Spot**
1. Open the app and view the interactive library map
2. Switch between different floors using the floor selector
3. Apply filters to find specific amenities (power outlets, quiet zones, etc.)
4. Tap on green (available) spots to see details

### **⏰ Reserving a Spot**
1. Select an available spot and tap "Hold Spot for 15 min"
2. You have 15 minutes to reach the library
3. Scan the QR code at your desk to check in
4. Scan again when leaving to check out

### **🔍 QR Code Scanner**
1. Navigate to the QR Scanner tab
2. Use "Demo Scan" button to test the functionality
3. In a real implementation, point camera at desk QR codes

## 🎨 **Design Features**

### **📱 Responsive Design**
- **Tablet Support**: Larger buttons, increased spacing, bigger text
- **Small Screen Optimization**: Compact layout for phones < 375px
- **Dynamic Sizing**: Components adapt to screen dimensions

### **⚡ Animations**
- **Entrance Effects**: Staggered animations on screen load
- **Micro-interactions**: Bounce effects on button presses
- **Live Indicators**: Pulsing animations for available spots
- **Smooth Transitions**: Fluid navigation between screens

### **🌈 Visual Effects**
- **Gradient Headers**: Multi-color gradients with shadow effects
- **Glow Effects**: Animated glowing elements in QR scanner
- **Particle Effects**: Floating particles for visual appeal
- **Color-coded Status**: Green/Red/Yellow for spot availability

## 📊 **Mock Data**

The app includes comprehensive mock data:
- **3 Library Floors** with different layouts
- **100+ Study Spots** with various features
- **Multiple Zones**: Silent, Group Study, Collaborative
- **Amenities**: Power outlets, windows, whiteboards, projectors
- **Real-time Status**: Available, Occupied, On-hold spots

## 🔧 **Development**

### **Available Scripts**
```bash
npm start          # Start Expo development server
npm run android    # Open on Android emulator
npm run ios        # Open on iOS simulator (macOS only)
npm run web        # Open in web browser
```

### **Key Components**
- **LibraryMapScreen**: Main interface with floor map and filters
- **FloorMap**: Interactive map rendering with spot animations
- **QRScannerScreen**: Camera interface with scanning animations
- **SpotModal**: Bottom sheet modal for spot selection
- **ReservationScreen**: Timer and reservation management

## 🎯 **Future Enhancements**

- **Backend Integration**: Real database with live updates
- **Push Notifications**: Spot availability alerts
- **User Authentication**: Login/registration system
- **Advanced Analytics**: Usage patterns and peak hours
- **Multi-campus Support**: Multiple library locations
- **Accessibility Features**: Screen reader support
- **Offline Mode**: Cached data for poor connectivity

## 📝 **License**

This project is private and confidential.

## 👨‍💻 **Developer**

Created with ❤️ for modern library management

---

**📱 Scan the QR code from `npm start` to test the app on your phone!**