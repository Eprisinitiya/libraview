export interface Spot {
  id: string;
  deskNumber: string;
  position: { x: number; y: number };
  status: 'available' | 'occupied' | 'onhold';
  features: string[];
  zone: 'silent' | 'group' | 'collaborative';
  reservedBy?: string;
  reservedUntil?: Date;
  holdTimer?: number;
}

export interface Floor {
  id: string;
  number: number;
  name: string;
  totalSpots: number;
  availableSpots: number;
  spots: Spot[];
}

export interface LibraryData {
  floors: Floor[];
}

export const mockLibraryData: LibraryData = {
  floors: [
    {
      id: 'floor-1',
      number: 1,
      name: 'Ground Floor',
      totalSpots: 40,
      availableSpots: 15,
      spots: [
        // Row 1 - Individual desks
        { id: '1A', deskNumber: '1A', position: { x: 50, y: 100 }, status: 'occupied', features: ['power_outlet'], zone: 'silent' },
        { id: '1B', deskNumber: '1B', position: { x: 120, y: 100 }, status: 'available', features: ['power_outlet', 'window'], zone: 'silent' },
        { id: '1C', deskNumber: '1C', position: { x: 190, y: 100 }, status: 'occupied', features: ['power_outlet'], zone: 'silent' },
        { id: '1D', deskNumber: '1D', position: { x: 260, y: 100 }, status: 'available', features: ['power_outlet', 'window'], zone: 'silent' },
        { id: '1E', deskNumber: '1E', position: { x: 330, y: 100 }, status: 'available', features: ['power_outlet'], zone: 'silent' },
        
        // Row 2
        { id: '1F', deskNumber: '1F', position: { x: 50, y: 180 }, status: 'occupied', features: ['window'], zone: 'silent' },
        { id: '1G', deskNumber: '1G', position: { x: 120, y: 180 }, status: 'onhold', features: ['power_outlet'], zone: 'silent', holdTimer: 12 },
        { id: '1H', deskNumber: '1H', position: { x: 190, y: 180 }, status: 'occupied', features: ['power_outlet'], zone: 'silent' },
        { id: '1I', deskNumber: '1I', position: { x: 260, y: 180 }, status: 'available', features: ['power_outlet', 'window'], zone: 'silent' },
        { id: '1J', deskNumber: '1J', position: { x: 330, y: 180 }, status: 'occupied', features: ['power_outlet'], zone: 'silent' },
        
        // Group study tables
        { id: '1K', deskNumber: '1K', position: { x: 80, y: 300 }, status: 'available', features: ['power_outlet', 'whiteboard'], zone: 'group' },
        { id: '1L', deskNumber: '1L', position: { x: 150, y: 300 }, status: 'available', features: ['power_outlet', 'whiteboard'], zone: 'group' },
        { id: '1M', deskNumber: '1M', position: { x: 220, y: 300 }, status: 'occupied', features: ['power_outlet', 'whiteboard'], zone: 'group' },
        { id: '1N', deskNumber: '1N', position: { x: 290, y: 300 }, status: 'occupied', features: ['power_outlet', 'whiteboard'], zone: 'group' },
        
        // Additional spots to reach 40 total
        { id: '1O', deskNumber: '1O', position: { x: 50, y: 400 }, status: 'available', features: ['power_outlet'], zone: 'collaborative' },
        { id: '1P', deskNumber: '1P', position: { x: 120, y: 400 }, status: 'occupied', features: ['window'], zone: 'collaborative' },
        { id: '1Q', deskNumber: '1Q', position: { x: 190, y: 400 }, status: 'available', features: ['power_outlet'], zone: 'collaborative' },
        { id: '1R', deskNumber: '1R', position: { x: 260, y: 400 }, status: 'available', features: ['power_outlet', 'window'], zone: 'collaborative' },
        { id: '1S', deskNumber: '1S', position: { x: 330, y: 400 }, status: 'occupied', features: ['power_outlet'], zone: 'collaborative' },
        { id: '1T', deskNumber: '1T', position: { x: 50, y: 480 }, status: 'available', features: ['window'], zone: 'collaborative' },
      ]
    },
    {
      id: 'floor-2',
      number: 2,
      name: 'Second Floor',
      totalSpots: 60,
      availableSpots: 35,
      spots: [
        // Premium quiet study area
        { id: '2A', deskNumber: '2A', position: { x: 50, y: 100 }, status: 'available', features: ['power_outlet', 'window', 'lamp'], zone: 'silent' },
        { id: '2B', deskNumber: '2B', position: { x: 120, y: 100 }, status: 'occupied', features: ['power_outlet', 'window', 'lamp'], zone: 'silent' },
        { id: '2C', deskNumber: '2C', position: { x: 190, y: 100 }, status: 'available', features: ['power_outlet', 'window', 'lamp'], zone: 'silent' },
        { id: '2D', deskNumber: '2D', position: { x: 260, y: 100 }, status: 'available', features: ['power_outlet', 'window', 'lamp'], zone: 'silent' },
        { id: '2E', deskNumber: '2E', position: { x: 330, y: 100 }, status: 'occupied', features: ['power_outlet', 'lamp'], zone: 'silent' },
        
        // Standard desks
        { id: '2F', deskNumber: '2F', position: { x: 50, y: 200 }, status: 'available', features: ['power_outlet'], zone: 'silent' },
        { id: '2G', deskNumber: '2G', position: { x: 120, y: 200 }, status: 'available', features: ['power_outlet'], zone: 'silent' },
        { id: '2H', deskNumber: '2H', position: { x: 190, y: 200 }, status: 'onhold', features: ['power_outlet'], zone: 'silent', holdTimer: 8 },
        { id: '2I', deskNumber: '2I', position: { x: 260, y: 200 }, status: 'occupied', features: ['power_outlet'], zone: 'silent' },
        { id: '2J', deskNumber: '2J', position: { x: 330, y: 200 }, status: 'available', features: ['power_outlet'], zone: 'silent' },
        
        // Collaborative spaces
        { id: '2K', deskNumber: '2K', position: { x: 80, y: 350 }, status: 'available', features: ['power_outlet', 'whiteboard', 'projector'], zone: 'group' },
        { id: '2L', deskNumber: '2L', position: { x: 150, y: 350 }, status: 'available', features: ['power_outlet', 'whiteboard'], zone: 'group' },
        { id: '2M', deskNumber: '2M', position: { x: 220, y: 350 }, status: 'available', features: ['power_outlet', 'whiteboard'], zone: 'group' },
        { id: '2N', deskNumber: '2N', position: { x: 290, y: 350 }, status: 'occupied', features: ['power_outlet', 'whiteboard'], zone: 'group' },
        
        // More spots to reach 60 total - distributed across different positions
        { id: '2O', deskNumber: '2O', position: { x: 50, y: 450 }, status: 'available', features: ['power_outlet'], zone: 'collaborative' },
        { id: '2P', deskNumber: '2P', position: { x: 120, y: 450 }, status: 'available', features: ['window'], zone: 'collaborative' },
        { id: '2Q', deskNumber: '2Q', position: { x: 190, y: 450 }, status: 'occupied', features: ['power_outlet'], zone: 'collaborative' },
        { id: '2R', deskNumber: '2R', position: { x: 260, y: 450 }, status: 'available', features: ['power_outlet', 'window'], zone: 'collaborative' },
        { id: '2S', deskNumber: '2S', position: { x: 330, y: 450 }, status: 'available', features: ['power_outlet'], zone: 'collaborative' },
        { id: '2T', deskNumber: '2T', position: { x: 50, y: 550 }, status: 'occupied', features: ['window'], zone: 'silent' },
      ]
    },
    {
      id: 'floor-3',
      number: 3,
      name: 'Third Floor',
      totalSpots: 45,
      availableSpots: 20,
      spots: [
        // Graduate study area
        { id: '3A', deskNumber: '3A', position: { x: 50, y: 100 }, status: 'available', features: ['power_outlet', 'window', 'lamp', 'lockable'], zone: 'silent' },
        { id: '3B', deskNumber: '3B', position: { x: 120, y: 100 }, status: 'occupied', features: ['power_outlet', 'window', 'lamp', 'lockable'], zone: 'silent' },
        { id: '3C', deskNumber: '3C', position: { x: 190, y: 100 }, status: 'available', features: ['power_outlet', 'window', 'lamp'], zone: 'silent' },
        { id: '3D', deskNumber: '3D', position: { x: 260, y: 100 }, status: 'occupied', features: ['power_outlet', 'lamp'], zone: 'silent' },
        { id: '3E', deskNumber: '3E', position: { x: 330, y: 100 }, status: 'available', features: ['power_outlet', 'window'], zone: 'silent' },
        
        // Research carrels
        { id: '3F', deskNumber: '3F', position: { x: 50, y: 220 }, status: 'occupied', features: ['power_outlet', 'lamp', 'lockable'], zone: 'silent' },
        { id: '3G', deskNumber: '3G', position: { x: 120, y: 220 }, status: 'available', features: ['power_outlet', 'lamp'], zone: 'silent' },
        { id: '3H', deskNumber: '3H', position: { x: 190, y: 220 }, status: 'available', features: ['power_outlet', 'lamp'], zone: 'silent' },
        { id: '3I', deskNumber: '3I', position: { x: 260, y: 220 }, status: 'occupied', features: ['power_outlet', 'lamp', 'lockable'], zone: 'silent' },
        { id: '3J', deskNumber: '3J', position: { x: 330, y: 220 }, status: 'onhold', features: ['power_outlet', 'window'], zone: 'silent', holdTimer: 5 },
        
        // Small group study rooms
        { id: '3K', deskNumber: '3K', position: { x: 100, y: 380 }, status: 'available', features: ['power_outlet', 'whiteboard', 'projector', 'privacy'], zone: 'group' },
        { id: '3L', deskNumber: '3L', position: { x: 200, y: 380 }, status: 'occupied', features: ['power_outlet', 'whiteboard', 'projector', 'privacy'], zone: 'group' },
        { id: '3M', deskNumber: '3M', position: { x: 300, y: 380 }, status: 'available', features: ['power_outlet', 'whiteboard', 'privacy'], zone: 'group' },
        
        // Additional research spots
        { id: '3N', deskNumber: '3N', position: { x: 50, y: 500 }, status: 'available', features: ['power_outlet', 'lamp'], zone: 'silent' },
        { id: '3O', deskNumber: '3O', position: { x: 120, y: 500 }, status: 'occupied', features: ['power_outlet', 'window'], zone: 'silent' },
      ]
    }
  ]
};

export const filterOptions = [
  { id: 'all', label: 'All Spots', icon: 'apps' },
  { id: 'silent', label: 'Silent Zone', icon: 'volume-off' },
  { id: 'group', label: 'Group Study', icon: 'people' },
  { id: 'power_outlet', label: 'Power Outlet', icon: 'flash' },
  { id: 'window', label: 'Window Seat', icon: 'sunny' },
  { id: 'whiteboard', label: 'Whiteboard', icon: 'easel' },
];

export const getSpotColor = (status: string): string => {
  switch (status) {
    case 'available':
      return '#4CAF50'; // Green
    case 'occupied':
      return '#F44336'; // Red  
    case 'onhold':
      return '#FF9800'; // Orange/Yellow
    default:
      return '#9E9E9E'; // Gray
  }
};

export const getFeatureIcon = (feature: string): string => {
  const iconMap: { [key: string]: string } = {
    'power_outlet': 'flash',
    'window': 'sunny',
    'whiteboard': 'easel',
    'projector': 'videocam',
    'lamp': 'bulb',
    'lockable': 'lock-closed',
    'privacy': 'eye-off',
  };
  return iconMap[feature] || 'checkmark-circle';
};