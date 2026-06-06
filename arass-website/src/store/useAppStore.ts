import { create } from 'zustand';

export type AppMode = 'default' | 'cyber' | 'minimal' | 'developer';
export type ActiveSection = 'hero' | 'about' | 'services' | 'portfolio' | 'contact' | 'booking';

interface AppState {
  // UI Mode
  mode: AppMode;
  setMode: (mode: AppMode) => void;

  // Navigation
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;

  // Loading
  isLoading: boolean;
  loadingProgress: number;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;

  // AI Assistant
  isAssistantOpen: boolean;
  toggleAssistant: () => void;
  setAssistantOpen: (open: boolean) => void;

  // 3D Scene
  cameraTarget: [number, number, number];
  setCameraTarget: (target: [number, number, number]) => void;

  // Cursor
  cursorLabel: string;
  setCursorLabel: (label: string) => void;
  cursorVariant: 'default' | 'hover' | 'click' | 'drag';
  setCursorVariant: (variant: 'default' | 'hover' | 'click' | 'drag') => void;

  // Portfolio
  selectedProject: string | null;
  setSelectedProject: (id: string | null) => void;
  portfolioFilter: string;
  setPortfolioFilter: (filter: string) => void;

  // Sound
  isSoundEnabled: boolean;
  toggleSound: () => void;

  // Dev Mode
  isDevMode: boolean;
  toggleDevMode: () => void;

  // Booking System
  isBookingOpen: boolean;
  setBookingOpen: (open: boolean) => void;
  bookingService: string | null;
  setBookingService: (service: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: 'default',
  setMode: (mode) => set({ mode }),

  activeSection: 'hero',
  setActiveSection: (activeSection) => set({ activeSection }),

  isLoading: true,
  loadingProgress: 0,
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),

  isAssistantOpen: false,
  toggleAssistant: () => set((state) => ({ isAssistantOpen: !state.isAssistantOpen })),
  setAssistantOpen: (isAssistantOpen) => set({ isAssistantOpen }),

  cameraTarget: [0, 0, 0],
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),

  cursorLabel: '',
  setCursorLabel: (cursorLabel) => set({ cursorLabel }),
  cursorVariant: 'default',
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),

  selectedProject: null,
  setSelectedProject: (selectedProject) => set({ selectedProject }),
  portfolioFilter: 'all',
  setPortfolioFilter: (portfolioFilter) => set({ portfolioFilter }),

  isSoundEnabled: false,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),

  isDevMode: false,
  toggleDevMode: () => set((state) => ({ isDevMode: !state.isDevMode })),

  isBookingOpen: false,
  setBookingOpen: (isBookingOpen) => set({ isBookingOpen }),
  bookingService: null,
  setBookingService: (bookingService) => set({ bookingService }),
}));
