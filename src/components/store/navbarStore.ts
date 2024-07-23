import { create } from 'zustand'

interface NavbarStore {
  isAuthDialogOpen: boolean
  setIsAuthDialogOpen: (isOpen: boolean) => void
  isAddPhoneDialogOpen: boolean
  setIsAddPhoneDialogOpen: (isOpen: boolean) => void
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  isAuthDialogOpen: false,
  setIsAuthDialogOpen: (isOpen) => set({ isAuthDialogOpen: isOpen }),
  isAddPhoneDialogOpen: false,
  setIsAddPhoneDialogOpen: (isOpen) => set({ isAddPhoneDialogOpen: isOpen }),
}))